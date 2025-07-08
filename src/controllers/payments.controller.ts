import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getIdParams, getQueryParams } from "../schema/zodSchema";

const getPayments = async (req: Request, res: Response) => {
  if (
    !req.user ||
    !req.session ||
    !req.user?.role ||
    req.user.role !== "admin"
  ) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  try {
    const validatedQuery = getQueryParams.safeParse(req.query);
    if (!validatedQuery.success) {
      res.status(400).json({
        error: "Invalid query parameters",
        details: validatedQuery.error.errors,
      });
      return;
    }

    const { page = 1, search = "" } = validatedQuery.data;
    const limit = 10;
    const offset = (page - 1) * limit;

    const [payments, totalPayments] = await prisma.$transaction([
      prisma.payment.findMany({
        where: {
          OR: [
            {
              payerEmail: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              paypalTransactionId: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          raceEntries: {
            select: {
              race: {
                select: {
                  id: true,
                  name: true,
                  date: true,
                },
              },
              bird: {
                select: {
                  id: true,
                  name: true,
                  bandNumber: true,
                },
              },
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.payment.count({
        where: {
          OR: [
            {
              payerEmail: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              paypalTransactionId: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      }),
    ]);

    const totalPages = Math.ceil(totalPayments / limit);

    res.status(200).json({
      message: "Payments retrieved successfully",
      data: payments,
      pagination: {
        page,
        limit,
        total: totalPayments,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(500).json({
      error: "An error occurred while retrieving payments",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getPaymentById = async (req: Request, res: Response) => {
  if (
    !req.user ||
    !req.session ||
    !req.user?.role ||
    req.user.role !== "admin"
  ) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      error: "Invalid payment ID",
      details: validatedParams.error.errors,
    });
    return;
  }

  try {
    const { id } = validatedParams.data;
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        raceEntries: {
          select: {
            id: true,
            status: true,
            race: {
              select: {
                id: true,
                name: true,
                date: true,
                entryFee: true,
              },
            },
            bird: {
              select: {
                id: true,
                name: true,
                bandNumber: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      res.status(404).json({
        error: "Payment not found",
      });
      return;
    }

    res.status(200).json({
      message: "Payment retrieved successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Error retrieving payment:", error);
    res.status(500).json({
      error: "An error occurred while retrieving the payment",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updatePaymentStatus = async (req: Request, res: Response) => {
  if (
    !req.user ||
    !req.session ||
    !req.user?.role ||
    req.user.role !== "admin"
  ) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      error: "Invalid payment ID",
      details: validatedParams.error.errors,
    });
    return;
  }

  const { status } = req.body;
  if (!status || !["PENDING", "SUCCESS", "FAILED"].includes(status)) {
    res.status(400).json({
      error: "Invalid status. Must be one of: PENDING, SUCCESS, FAILED",
    });
    return;
  }

  try {
    const { id } = validatedParams.data;
    
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { raceEntries: true },
    });

    if (!payment) {
      res.status(404).json({
        error: "Payment not found",
      });
      return;
    }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: { status },
    });

    // Update related race entries based on payment status
    if (status === "SUCCESS") {
      await prisma.raceEntry.updateMany({
        where: { paymentId: id },
        data: { status: "PAID" },
      });
    } else if (status === "FAILED") {
      await prisma.raceEntry.updateMany({
        where: { paymentId: id },
        data: { status: "CANCELLED" },
      });
    }

    res.status(200).json({
      message: "Payment status updated successfully",
      data: updatedPayment,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      error: "An error occurred while updating the payment status",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { getPayments, getPaymentById, updatePaymentStatus };
