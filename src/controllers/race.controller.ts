import type { Request, Response } from "express";
import {
  createRaceOrderBody,
  getIdParams,
  getRaceQueryParams,
} from "../schema/zodSchema";
import { prisma } from "../lib/prisma";
import { getAccessToken } from "../lib/paypalAccessToken";
import got from "got";

const getRaces = async (req: Request, res: Response) => {
  const validatedQuery = getRaceQueryParams.parse(req.query);
  if (!validatedQuery) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  try {
    const { page = 1, search = "", status } = validatedQuery;
    const limit = 10;
    const offset = (page - 1) * limit;
    const [races, totalRaces] = await prisma.$transaction([
      prisma.race.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
          status: status ? status : undefined,
        },
        include: {
          _count: {
            select: {
              entries: {
                where: {
                  status: "PAID",
                },
              },
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          date: "asc",
        },
      }),
      prisma.race.count({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
          status: status ? status : undefined,
        },
      }),
    ]);
    const totalPages = Math.ceil(totalRaces / limit);
    res.status(200).json({
      message: "Races fetched successfully",
      data: races,
      pagination: {
        page,
        limit,
        total: totalRaces,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetchning races:", error);
    res.status(500).json({
      error: "An error occurred while fetching races",
    });
  }
};

const getRaceById = async (req: Request, res: Response) => {
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }
  const { id } = validatedParams.data;
  try {
    const race = await prisma.race.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            entries: {
              where: {
                status: "PAID",
              },
            },
          },
        },
      },
    });
    if (!race) {
      res.status(404).json({ error: " Race not found" });
      return;
    }
    res.status(200).json({
      message: "Race fetched successfully",
      data: race,
    });
  } catch (error) {
    console.error("Error fetching race", error);
    res.status(500).json({
      error: "An error occurred while fetching the race",
    });
  }
};

const createRaceOrder = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }
  const { id } = validatedParams.data;
  try {
    const race = await prisma.race.findUnique({
      where: { id },
    });
    if (!race) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    const validatedBody = createRaceOrderBody.safeParse(req.body);
    if (!validatedBody.success) {
      res.status(400).json({
        error: "Invalid request body",
        details: validatedBody.error.errors,
      });
      return;
    }
    const { birdId } = validatedBody.data;

    // Check if race is still accepting entries
    if (race.status !== "UPCOMING") {
      res.status(400).json({ error: "Race is not accepting entries" });
      return;
    }

    // Check if there are available slots
    const currentEntries = await prisma.raceEntry.count({
      where: { raceId: id, status: { in: ["PENDING", "PAID"] } },
    });

    if (currentEntries + birdId.length > race.maxParticipants) {
      res
        .status(400)
        .json({ error: "Not enough slots available for all birds" });
      return;
    }

    const birds = await prisma.bird.findMany({
      where: {
        id: {
          in: birdId,
        },
        loft: {
          userId: req.user.id,
        },
      },
    });
    if (birds.length !== birdId.length) {
      res.status(404).json({ error: "Some birds not found in your loft" });
      return;
    }

    // Check if any bird is already entered in this race
    const existingEntries = await prisma.raceEntry.findMany({
      where: {
        raceId: id,
        birdId: { in: birdId },
      },
    });

    if (existingEntries.length > 0) {
      res
        .status(400)
        .json({ error: "Some birds are already entered in this race" });
      return;
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      res.status(500).json({ error: "Failed to fetch PayPal access token" });
      return;
    }

    // Calculate total amount
    const totalAmount = (birdId.length * race.entryFee).toFixed(2);

    const paypalOrder = await got.post(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        json: {
          intent: "CAPTURE",
          purchase_units: [
            {
              items: birdId.map((birdId, index) => {
                const bird = birds.find((b) => b.id === birdId);
                if (!bird) throw new Error(`Bird with ID ${birdId} not found`);
                return {
                  name: `Race Entry - ${bird.name}`,
                  description: `Entry for ${race.name} - Bird: ${bird.name} (${bird.bandNumber})`,
                  quantity: "1",
                  unit_amount: {
                    currency_code: "USD",
                    value: race.entryFee.toFixed(2),
                  },
                };
              }),
              amount: {
                currency_code: "USD",
                value: totalAmount,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: totalAmount,
                  },
                },
              },
            },
          ],
          application_context: {
            return_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
          },
        },
      }
    );

    const orderData = JSON.parse(paypalOrder.body);

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        paypalTransactionId: orderData.id,
        payerEmail: req.user!.email,
        amount: parseFloat(totalAmount),
        currency: "USD",
        status: "PENDING",
        paymentTime: new Date(),
        userId: req.user!.id,
      },
    });

    // Create race entries with PENDING status
    const raceEntries = await prisma.raceEntry.createMany({
      data: birdId.map((birdId) => ({
        raceId: id,
        birdId,
        userId: req.user!.id,
        paymentId: payment.id,
        status: "PENDING",
      })),
    });

    res.status(201).json({
      message: "Race order created successfully",
      data: {
        orderId: orderData.id,
      },
    });
  } catch (error) {
    console.error("Error creating race order:", error);
    res.status(500).json({
      error: "An error occurred while creating the race order",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const capturePayPalPayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res.status(400).json({ error: "Order ID is required" });
      return;
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      res.status(500).json({ error: "Failed to fetch PayPal access token" });
      return;
    }

    // Capture the payment
    const captureResponse = await got.post(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = JSON.parse(captureResponse.body);

    if (captureData.status === "COMPLETED") {
      // Update payment status
      const payment = await prisma.payment.findUnique({
        where: { paypalTransactionId: orderId },
        include: { raceEntries: true },
      });

      if (!payment) {
        res.status(404).json({ error: "Payment not found" });
        return;
      }

      // Update payment status to SUCCESS
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "SUCCESS",
          paymentTime: new Date(),
        },
      });

      // Update all race entries status to PAID
      await prisma.raceEntry.updateMany({
        where: { paymentId: payment.id },
        data: { status: "PAID" },
      });

      res.status(200).json({
        message: "Payment captured successfully",
        data: {
          orderId,
          paymentId: payment.id,
          status: "SUCCESS",
          entriesUpdated: payment.raceEntries.length,
        },
      });
    } else {
      // Payment failed, update status
      await prisma.payment.update({
        where: { paypalTransactionId: orderId },
        data: { status: "FAILED" },
      });

      // Update race entries status to CANCELLED
      await prisma.raceEntry.updateMany({
        where: {
          payment: { paypalTransactionId: orderId },
        },
        data: { status: "CANCELLED" },
      });

      res.status(400).json({
        error: "Payment capture failed",
        details: captureData,
      });
    }
  } catch (error) {
    console.error("Error capturing PayPal payment:", error);
    res.status(500).json({
      error: "An error occurred while capturing the payment",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { getRaces, getRaceById, createRaceOrder, capturePayPalPayment };
