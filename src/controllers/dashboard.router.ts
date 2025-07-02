import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const getDashboardData = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const [
      totalLoftOwners,
      totalBirds,
      totalRaces,
      upcomingRaces,
      totalPayments,
    ] = await prisma.$transaction([
      prisma.user.count(),
      prisma.bird.count(),
      prisma.race.count(),
      prisma.race.count({
        where: {
          status: "UPCOMING",
        },
      }),
      prisma.payment.aggregate({
        _sum: {
          entryFee: true,
        },
      }),
    ]);
    res.json({
      message: "Dashboard data fetched successfully",
      data: {
        totalLoftOwners,
        totalBirds,
        totalRaces,
        upcomingRaces,
        totalPayments: totalPayments._sum.entryFee || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { getDashboardData };
