import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createRaceBody,
  getIdParams,
  updateRaceBody,
  updateUserBody,
} from "../schema/zodSchema";
import s3Client from "../lib/s3client";

const getDashboardData = async (req: Request, res: Response) => {
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
    const [
      totalLoftOwners,
      totalBirds,
      totalRaces,
      upcomingRaces,
      totalPayments,
    ] = await prisma.$transaction([
      prisma.user.count({
        where: {
          role: "user",
        },
      }),
      prisma.bird.count(),
      prisma.race.count(),
      prisma.race.count({
        where: {
          status: "UPCOMING",
        },
      }),
      prisma.payment.aggregate({
        _sum: {
          amount: true,
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
        totalPayments: totalPayments._sum.amount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
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
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        banned: true,
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

const getUserById = async (req: Request, res: Response) => {
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
      error: "Invalid user ID",
      details: validatedParams.error.errors,
    });
    return;
  }
  const { id } = validatedParams.data;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getUserSummary = async (req: Request, res: Response) => {
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
    const [totalBirds, racesJoined, totalWins, paidAmount] =
      await prisma.$transaction([
        prisma.bird.count({
          where: {
            loft: {
              userId: id,
            },
          },
        }),
        prisma.raceEntry.count({
          where: {
            userId: id,
          },
        }),
        prisma.raceEntry.count({
          where: {
            userId: id,
            position: {
              lte: 10,
            },
          },
        }),
        prisma.payment.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId: id,
          },
        }),
      ]);
    res.status(200).json({
      message: "User fetched successfully",
      data: {
        totalBirds,
        racesJoined,
        totalWins,
        paidAmount: paidAmount._sum.amount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
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
      error: "Invalid user ID",
      details: validatedParams.error.errors,
    });
    return;
  }
  const { id } = validatedParams.data;
  const validatedBody = updateUserBody.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: validatedBody.error.errors,
    });
    return;
  }
  const { banned, banReason } = validatedBody.data;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        banned,
        banReason: banReason || null,
      },
    });
    res.status(200).json({
      message: "User status updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const getBirdByUserId = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const validatedParams = getIdParams.safeParse(req.params);
    if (!validatedParams.success) {
      res.status(400).json({
        error: "Invalid user ID",
        details: validatedParams.error.errors,
      });
      return;
    }
    const { id } = validatedParams.data;
    const birds = await prisma.bird.findMany({
      where: {
        loft: {
          userId: id,
        },
      },
      select: {
        loft: {
          select: {
            name: true,
            loftId: true,
          },
        },
        id: true,
        name: true,
        bandNumber: true,
        color: true,
        breed: true,
        gender: true,
      },
    });
    res.status(200).json({
      message: "Birds fetched successfully",
      data: birds,
    });
  } catch (error) {
    console.error("Error fetching birds:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRacesJoined = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const validatedParams = getIdParams.safeParse(req.params);
    if (!validatedParams.success) {
      res.status(400).json({
        error: "Invalid user ID",
        details: validatedParams.error.errors,
      });
      return;
    }
    const { id } = validatedParams.data;
    const racesJoined = await prisma.raceEntry.findMany({
      where: {
        bird: {
          loft: {
            userId: id,
          },
        },
      },
      include: {
        bird: {
          select: {
            name: true,
            color: true,
            bandNumber: true,
            breed: true,
          },
        },
        race: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Fetched races joined successfully",
      data: racesJoined,
    });
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const getWinsByUser = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const validatedParams = getIdParams.safeParse(req.params);
    if (!validatedParams.success) {
      res.status(400).json({
        error: "Invalid user ID",
        details: validatedParams.error.errors,
      });
      return;
    }
    const { id } = validatedParams.data;
    const wins = await prisma.raceEntry.findMany({
      where: {
        bird: {
          loft: {
            userId: id,
          },
        },
        race: {
          status: "COMPLETED",
        },
      },
      include: {
        bird: {
          select: {
            name: true,
            color: true,
            bandNumber: true,
            breed: true,
          },
        },
        race: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Wins fetched successfully",
      data: wins,
    });
  } catch (error) {
    console.error("Error fetching wins:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getPaymentsByUser = async (req: Request, res: Response) => {
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
    const validatedParams = getIdParams.safeParse(req.params);
    if (!validatedParams.success) {
      res.status(400).json({
        error: "Invalid user ID",
        details: validatedParams.error.errors,
      });
      return;
    }
    const { id } = validatedParams.data;
    const payments = await prisma.payment.findMany({
      where: {
        userId: id,
      },
      include: {
        raceEntries: {
          include: {
            bird: {
              select: {
                name: true,
                loft: {
                  select: {
                    name: true,
                    loftId: true,
                  },
                },
              },
            },
            race: {
              select: {
                name: true,
              },
            },
          },
        },
      },
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

const getRaces = async (req: Request, res: Response) => {
  if (
    !req.session ||
    !req.user ||
    !req.user.role ||
    req.user.role !== "admin"
  ) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  try {
    const races = await prisma.race.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            entries: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Races fetched successfully",
      data: races,
    });
  } catch (error) {
    console.error("Error fetching races:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const createRace = async (req: Request, res: Response) => {
  if (
    !req.session ||
    !req.user ||
    !req.user.role ||
    req.user.role !== "admin"
  ) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    console.log(req.body);
    console.log(req.file);
    const validatedBody = createRaceBody.safeParse(req.body);
    if (!validatedBody.success) {
      res.status(400).json({
        error: "Invalid request body",
        details: validatedBody.error.errors,
      });
      return;
    }
    let race = await prisma.race.create({
      data: {
        name: validatedBody.data.name,
        date: validatedBody.data.date,
        distanceKm: validatedBody.data.distanceKm,
        startLocation: validatedBody.data.startLocation,
        endLocation: validatedBody.data.endLocation,
        entryFee: validatedBody.data.entryFee,
        maxParticipants: validatedBody.data.maxParticipants,
        status: validatedBody.data.status,
        rules: validatedBody.data.rules,
        description: validatedBody.data.description,
      },
    });
    const key = `races/${race.id}-${Date.now()}.${
      req.file?.mimetype.split("/")[1]
    }`;
    await s3Client.write(key, req.file?.buffer as Buffer, {
      acl: "public-read",
    });
    const url = `${process.env.CLOUDFLARE_PUBLIC_URL}/${key}`;
    race = await prisma.race.update({
      where: {
        id: race.id,
      },
      data: {
        photoUrl: url,
      },
    });
    res.status(201).json({
      message: "Race created successfully",
      data: race,
    });
  } catch (error) {
    console.error("Error creating races :", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const getRaceById = async (req: Request, res: Response) => {
  if (
    !req.session ||
    !req.user ||
    !req.user.role ||
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
      error: "Invalid Race ID",
      details: validatedParams.error.errors,
    });
    return;
  }
  try {
    const { id } = validatedParams.data;
    const race = await prisma.race.findUnique({
      where: { id },
    });
    if (!race) {
      res.status(404).json({
        error: "Race not found",
      });
      return;
    }
    res.status(200).json({
      message: "Race fetched successfully",
      data: race,
    });
  } catch (error) {
    console.error("Error fetching race");
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const updateRace = async (req: Request, res: Response) => {
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
      error: "Invalid Race ID",
      details: validatedParams.error.errors,
    });
    return;
  }
  try {
    const { id } = validatedParams.data;
    const validatedBody = updateRaceBody.safeParse(req.body);
    if (!validatedBody.success) {
      res.status(400).json({
        error: "Invalid request body",
        details: validatedBody.error.errors,
      });
      return;
    }
    const existingRace = await prisma.race.findUnique({
      where: { id },
    });
    if (!existingRace) {
      res.status(404).json({
        error: "Race not found",
      });
      return;
    }
    await prisma.race.update({
      where: { id },
      data: {
        name: validatedBody.data.name,
        date: validatedBody.data.date,
        distanceKm: validatedBody.data.distanceKm,
        startLocation: validatedBody.data.startLocation,
        endLocation: validatedBody.data.endLocation,
        entryFee: validatedBody.data.entryFee,
        maxParticipants: validatedBody.data.maxParticipants,
        status: validatedBody.data.status,
        rules: validatedBody.data.rules,
        description: validatedBody.data.description,
      },
    });
    res.status(200).json({
      message: "Race updated successfully",
    });
  } catch (error) {
    console.error("Error updating race:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getAllPayments = async (req: Request, res: Response) => {
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
    const payments = await prisma.payment.findMany({
      include: {
        raceEntries: {
          include: {
            race: {
              select: {
                name: true,
              },
            },
            bird: {
              select: {
                loft: {
                  select: {
                    loftId: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
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

export {
  getDashboardData,
  getUsers,
  getUserById,
  updateUserStatus,
  getUserSummary,
  getBirdByUserId,
  getRacesJoined,
  getWinsByUser,
  getPaymentsByUser,
  getRaces,
  createRace,
  getRaceById,
  updateRace,
  getAllPayments,
};
