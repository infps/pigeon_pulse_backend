import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createRaceBody,
  getIdParams,
  updateRaceBody,
  updateUserBody,
  getQueryParams,
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
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const whereClause = search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
      ],
    } : {};
    
    const [users, totalUsers] = await prisma.$transaction([
      prisma.user.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          banned: true,
        },
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count({
        where: whereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalUsers / limit);
    
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
      pagination: {
        page,
        limit,
        total: totalUsers,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
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
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { id } = validatedParams.data;
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const whereClause = {
      loft: {
        userId: id,
      },
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { bandNumber: { contains: search, mode: "insensitive" as const } },
          { color: { contains: search, mode: "insensitive" as const } },
          { breed: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };
    
    const [birds, totalBirds] = await prisma.$transaction([
      prisma.bird.findMany({
        where: whereClause,
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
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.bird.count({
        where: whereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalBirds / limit);
    
    res.status(200).json({
      message: "Birds fetched successfully",
      data: birds,
      pagination: {
        page,
        limit,
        total: totalBirds,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching birds:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRacesJoined = async (req: Request, res: Response) => {
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
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { id } = validatedParams.data;
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const whereClause = {
      bird: {
        loft: {
          userId: id,
        },
      },
      ...(search && {
        OR: [
          { bird: { name: { contains: search, mode: "insensitive" as const } } },
          { bird: { bandNumber: { contains: search, mode: "insensitive" as const } } },
          { race: { name: { contains: search, mode: "insensitive" as const } } },
        ],
      }),
    };
    
    const [racesJoined, totalRaces] = await prisma.$transaction([
      prisma.raceEntry.findMany({
        where: whereClause,
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
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.raceEntry.count({
        where: whereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalRaces / limit);
    
    res.status(200).json({
      message: "Fetched races joined successfully",
      data: racesJoined,
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
    console.error("Error fetching data", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const getWinsByUser = async (req: Request, res: Response) => {
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
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { id } = validatedParams.data;
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const whereClause = {
      bird: {
        loft: {
          userId: id,
        },
      },
      race: {
        status: "COMPLETED" as const,
      },
      ...(search && {
        OR: [
          { 
            bird: { 
              name: { contains: search, mode: "insensitive" as const },
              loft: { userId: id }
            }
          },
          { 
            bird: { 
              bandNumber: { contains: search, mode: "insensitive" as const },
              loft: { userId: id }
            }
          },
          { 
            race: { 
              name: { contains: search, mode: "insensitive" as const },
              status: "COMPLETED" as const
            }
          },
        ],
      }),
    };
    
    const [wins, totalWins] = await prisma.$transaction([
      prisma.raceEntry.findMany({
        where: whereClause,
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
        skip: offset,
        take: limit,
        orderBy: {
          position: "asc",
        },
      }),
      prisma.raceEntry.count({
        where: whereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalWins / limit);
    
    res.status(200).json({
      message: "Wins fetched successfully",
      data: wins,
      pagination: {
        page,
        limit,
        total: totalWins,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
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

  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      error: "Invalid user ID",
      details: validatedParams.error.errors,
    });
    return;
  }
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { id } = validatedParams.data;
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const whereClause = {
      userId: id,
      ...(search && {
        OR: [
          { raceEntries: { some: { bird: { name: { contains: search, mode: "insensitive" as const } } } } },
          { raceEntries: { some: { race: { name: { contains: search, mode: "insensitive" as const } } } } },
        ],
      }),
    };
    
    const [payments, totalPayments] = await prisma.$transaction([
      prisma.payment.findMany({
        where: whereClause,
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
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.payment.count({
        where: whereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalPayments / limit);
    
    res.status(200).json({
      message: "Payments fetched successfully",
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

  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const whereClause = search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { startLocation: { contains: search, mode: "insensitive" as const } },
        { endLocation: { contains: search, mode: "insensitive" as const } },
      ],
    } : {};
    
    const [races, totalRaces] = await prisma.$transaction([
      prisma.race.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
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
      }),
      prisma.race.count({
        where: whereClause,
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
    const validatedBody = createRaceBody.safeParse(req.body);
    if (!validatedBody.success) {
      res.status(400).json({
        error: "Invalid request body",
        details: validatedBody.error.errors,
      });
      return;
    }
    
    // Validate file upload
    if (!req.file) {
      res.status(400).json({
        error: "Race photo is required",
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
    
    const fileExtension = req.file.mimetype.split("/")[1];
    const key = `races/${race.id}-${Date.now()}.${fileExtension}`;
    
    await s3Client.write(key, req.file.buffer, {
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
    console.error("Error creating race:", error);
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
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const whereClause = search ? {
      OR: [
        { user: { name: { contains: search, mode: "insensitive" as const } } },
        { user: { email: { contains: search, mode: "insensitive" as const } } },
        { raceEntries: { some: { race: { name: { contains: search, mode: "insensitive" as const } } } } },
        { raceEntries: { some: { bird: { name: { contains: search, mode: "insensitive" as const } } } } },
      ],
    } : {};
    
    const [payments, totalPayments] = await prisma.$transaction([
      prisma.payment.findMany({
        where: whereClause,
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
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.payment.count({
        where: whereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalPayments / limit);
    
    res.status(200).json({
      message: "Payments fetched successfully",
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
    console.error("Error fetching payments:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRaceStatistics = async (req: Request, res: Response) => {
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
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const whereClause = {
      status: "COMPLETED" as const,
      ...(search && {
        name: { contains: search, mode: "insensitive" as const },
      }),
    };
    
    const [raceStats, totalRaces] = await prisma.$transaction([
      prisma.race.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          entries: {
            select: {
              position: true,
              bird: {
                select: {
                  name: true,
                  bandNumber: true,
                  loft: {
                    select: {
                      name: true,
                      loftId: true,
                    },
                  },
                },
              },
              arrivalTime: true,
            },
            take: 4,
            orderBy: {
              position: "asc",
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.race.count({
        where: whereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalRaces / limit);
    
    res.status(200).json({
      message: "Race stats fetched successfully",
      data: raceStats,
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
    console.error("Error fetching race statistics:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRaceStatisticsById = async (req: Request, res: Response) => {
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
      error: "Invalid RaceId",
      details: validatedParams.error.errors,
    });
    return;
  }
  
  const validatedQuery = getQueryParams.safeParse(req.query);
  if (!validatedQuery.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: validatedQuery.error.errors,
    });
    return;
  }
  
  const { id } = validatedParams.data;
  const { page = 1, search } = validatedQuery.data;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const race = await prisma.race.findUnique({
      where: { id },
    });
    if (!race) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    
    const entryWhereClause = {
      raceId: id,
      ...(search && {
        OR: [
          { bird: { name: { contains: search, mode: "insensitive" as const } } },
          { bird: { bandNumber: { contains: search, mode: "insensitive" as const } } },
          { bird: { loft: { name: { contains: search, mode: "insensitive" as const } } } },
        ],
      }),
    };
    
    const [entries, totalEntries] = await prisma.$transaction([
      prisma.raceEntry.findMany({
        where: entryWhereClause,
        select: {
          position: true,
          bird: {
            select: {
              name: true,
              bandNumber: true,
              loft: {
                select: {
                  name: true,
                  loftId: true,
                },
              },
            },
          },
          arrivalTime: true,
        },
        skip: offset,
        take: limit,
        orderBy: {
          position: "asc",
        },
      }),
      prisma.raceEntry.count({
        where: entryWhereClause,
      }),
    ]);
    
    const totalPages = Math.ceil(totalEntries / limit);
    
    const raceStats = {
      id: race.id,
      name: race.name,
      entries,
    };
    
    res.status(200).json({
      message: "Race statistics fetched successfully",
      data: raceStats,
      pagination: {
        page,
        limit,
        total: totalEntries,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching race statistics by ID:", error);
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
  getRaceStatistics,
  getRaceStatisticsById,
};
