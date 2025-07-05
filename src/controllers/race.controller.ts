import type { Request, Response } from "express";
import { getIdParams, getRaceQueryParams } from "../schema/zodSchema";
import { prisma } from "../lib/prisma";

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
              entries: true,
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
            entries: true,
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

export { getRaces, getRaceById };
