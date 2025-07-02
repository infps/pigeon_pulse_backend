import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getUserByIdParams } from "../schema/zodSchema";

export const getUsers = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      take: 10,
    });
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  const validatedParams = getUserByIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      error: "Invalid user ID",
      details: validatedParams.error.errors,
    });
    return;
  }
  const { id } = validatedParams.data;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    res.status(404).json({
      error: "User not found",
    });
    return;
  }
  try {
    const [user, totalBirds, racesJoined, totalWins, paidAmount] =
      await prisma.$transaction([
        prisma.user.findUnique({
          where: { id },
          select: {
            name: true,
            email: true,
          },
        }),
        prisma.bird.count({
          where: {
            loft: {
              userId: id,
            },
          },
        }),
        prisma.raceEntry.count({
          where: {
            bird: {
              loft: {
                userId: id,
              },
            },
          },
        }),
        prisma.raceEntry.count({
          where: {
            bird: {
              loft: {
                userId: id,
              },
            },
            rank: {
              equals: 1,
            },
          },
        }),
        prisma.payment.aggregate({
          _sum: {
            entryFee: true,
          },
        }),
      ]);
    res.status(200).json({
      message: "User fetched successfully",
      data: {
        user,
        totalBirds,
        racesJoined,
        totalWins,
        paidAmount: paidAmount._sum.entryFee || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
