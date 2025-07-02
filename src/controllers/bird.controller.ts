import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getUserByIdParams } from "../schema/zodSchema";

const getBirdByUserId = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const validatedParams = getUserByIdParams.safeParse(req.params);
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
