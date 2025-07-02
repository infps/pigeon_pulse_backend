import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const getPayments = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        race: {
          select: {
            id: true,
            name: true,
            date: true,
          },
        },
      },
      take: 10,
    });
    res.status(200).json({
      message: "Payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { getPayments };
