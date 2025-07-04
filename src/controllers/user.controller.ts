import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getIdParams } from "../schema/zodSchema";

const getUsers = async (req: Request, res: Response) => {
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

const getUserById = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
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
            ownerId: id,
          },
        }),
        prisma.raceEntry.count({
          where: {
            bird: {
              ownerId: id,
            },
          },
        }),
        prisma.raceEntry.count({
          where: {
            bird: {
              ownerId: id,
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
          ownerId: id,
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

const getTotalAmountPaid = async (req: Request, res: Response) => {
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
    const paidAmount = await prisma.payment.aggregate({
      _sum: {
        entryFee: true,
      },
      where: {
        userId: id,
      },
    });
    res.status(200).json({
      message: "Total paid amount fetched successfully",
      data: {
        totalPaidAmount: paidAmount._sum.entryFee || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching total paid amount:", error);
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
          ownerId: id,
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
        ownerId: id,
      },
      include: {
        loft: {
          select: {
            name: true,
          },
        },
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

const getLoftsbyUserId = async (req: Request, res: Response) => {
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
    const lofts = await prisma.loft.findMany({
      where: {
        users: {
          some: {
            userId: id,
          },
        },
      },
    });
    res.status(200).json({
      message: "Lofts fetched successfully",
      data: lofts,
    });
  } catch (error) {
    console.error("Error fetching lofts:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getBirdsByLoftId = async (req: Request, res: Response) => {
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
        error: "Invalid loft ID",
        details: validatedParams.error.errors,
      });
      return;
    }
    const { id } = validatedParams.data;
    const birds = await prisma.bird.findMany({
      where: {
        loftId: id,
      },
    });
    res.status(200).json({
      message: "Birds fetched successfully",
      data: birds,
    });
  } catch (error) {
    console.error("Error fetching birds by loft ID:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getMyProfile = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }
    res.status(200).json({
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export {
  getUsers,
  getUserById,
  getWinsByUser,
  getTotalAmountPaid,
  getRacesJoined,
  getBirdByUserId,
  getLoftsbyUserId,
};
