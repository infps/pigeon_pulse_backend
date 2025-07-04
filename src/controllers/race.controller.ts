import type { Request, Response } from "express";
import {
  createRaceBody,
  getIdParams,
  updateRaceBody,
  updateRaceParams,
} from "../schema/zodSchema";
import { prisma } from "../lib/prisma";
import s3Client from "../lib/s3client";

const createRace = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  const body = req.body;
  const validatedBody = createRaceBody.safeParse(body);
  if (!validatedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      issues: validatedBody.error.issues,
    });
    return;
  }
  const file = req.file;
  if (!file || file.size < 0 || file.size > 5 * 1024 * 1024) {
    res.status(400).json({
      error: "Invalid file upload. File must be less than 5MB.",
    });
    return;
  }
  try {
    const race = await prisma.race.create({
      data: {
        name: validatedBody.data.name,
        date: new Date(validatedBody.data.date),
        startTime: new Date(validatedBody.data.startTime),
        distanceKm: validatedBody.data.distanceKm,
        startLocation: validatedBody.data.startLocation,
        endLocation: validatedBody.data.endLocation,
        entryFee: validatedBody.data.entryFee,
        maxParticipants: validatedBody.data.maxParticipants,
        status: validatedBody.data.status,
        rules: validatedBody.data.rules,
        description: validatedBody.data.description,
        createdById: req.user?.id,
      },
    });
    const key = `races/${race.id}-${file.originalname}`;
    await s3Client.write(key, file.buffer, {
      acl: "public-read",
    });
    await prisma.race.update({
      where: {
        id: race.id,
      },
      data: {
        photo: key,
      },
    });
    res.status(201).json({
      message: "Race created successfully",
      data: {
        id: race.id,
      },
    });
  } catch (error) {
    console.error("Error creating races:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRaces = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const races = await prisma.race.findMany({
      where: {
        createdById: req.user.id,
      },
      take: 10,
      orderBy: {
        date: "desc",
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
    console.error("Error in getRaces:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const updateRace = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  const validatedParams = updateRaceParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      error: "Invalid request parameters",
      issues: validatedParams.error.issues,
    });
    return;
  }
  const validatedBody = updateRaceBody.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      issues: validatedBody.error.issues,
    });
    return;
  }
  try {
    const race = await prisma.race.findUnique({
      where: {
        id: validatedParams.data.id,
        createdById: req.user.id,
      },
    });
    if (!race) {
      res.status(404).json({
        error: "Race not found or you do not have permission to update it",
      });
      return;
    }
    await prisma.race.update({
      where: {
        id: validatedParams.data.id,
      },
      data: {
        ...validatedBody.data,
      },
    });
    res.status(200).json({
      message: "Race updated successfully",
      data: {
        id: validatedParams.data.id,
      },
    });
  } catch (error) {
    console.error("Error updating race", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRaceStats = async (req: Request, res: Response) => {
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
        error: "Invalid request parameters",
        issues: validatedParams.error.issues,
      });
      return;
    }
    const { id } = validatedParams.data;
    const stats = await prisma.raceEntry.findMany({
      where: {
        raceId: id,
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
      orderBy: {
        arrivalTime: "asc",
      },
    });
    res.status(200).json({
      message: "Stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRaceById = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      error: "Invalid request parameters",
      issues: validatedParams.error.issues,
    });
    return;
  }
  try {
    const { id } = validatedParams.data;
    const race = await prisma.race.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: {
            entries: true,
          },
        },
      },
    });
    if (!race) {
      res.status(404).json({ message: "Race not found" });
      return;
    }
    res.status(200).json({
      message: "Race fetched successfully",
      data: race,
    });
  } catch (error) {
    console.error("Error fetching race by ID:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { createRace, getRaces, updateRace, getRaceStats, getRaceById };
