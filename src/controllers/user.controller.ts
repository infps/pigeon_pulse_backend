import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createBirdBody,
  createLoftBody,
  getIdParams,
  getQueryParams,
  getRaceQueryParams,
  inviteToLobyParams,
  updateBirdBody,
  updateLoftBody,
} from "../schema/zodSchema";
import s3Client from "../lib/s3client";

const getMyDashboard = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  try {
    const [birds, races, wins, payments, raceResult] =
      await prisma.$transaction([
        prisma.bird.count({
          where: {
            loft: {
              userId: req.user.id,
            },
          },
        }),
        prisma.raceEntry.count({
          where: {
            userId: req.user.id,
          },
        }),
        prisma.raceEntry.count({
          where: {
            userId: req.user.id,
            position: {
              lte: 3,
            },
          },
        }),
        prisma.payment.count({
          where: {
            userId: req.user.id,
            status: "SUCCESS",
          },
        }),
        prisma.raceEntry.findMany({
          where: {
            userId: req.user.id,
          },
          select: {
            bird: {
              select: {
                name: true,
                id: true,
                bandNumber: true,
              },
            },
            arrivalTime: true,
            position: true,
            speed: true,
          },
        }),
      ]);
    res.status(200).json({
      message: "Dashboard data retrieved successfully.",
      data: {
        birds,
        races,
        wins,
        payments,
        raceResult,
      },
    });
  } catch (error) {
    console.error("Error retrieving dashboard data:", error);
    res.status(500).json({
      message: "An error occurred while retrieving dashboard data.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getMyLofts = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  try {
    const lofts = await prisma.loft.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        loftId: true,
        location: true,
      },
    });
    res.status(200).json({
      message: "Lofts retrieved successfully.",
      data: lofts,
    });
  } catch (error) {
    console.error("Error retrieving lofts:", error);
    res.status(500).json({
      message: "An error occurred while retrieving lofts.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getLoftById = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      message: "Invalid loft ID.",
      error: validatedParams.error.errors,
    });
    return;
  }
  try {
    const { id } = validatedParams.data;
    const loft = await prisma.loft.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: {
            birds: true,
          },
        },
        birds: {
          select: {
            id: true,
            name: true,
            color: true,
            bandNumber: true,
            breed: true,
            status: true,
          },
        },
      },
    });
    if (!loft) {
      res.status(404).json({
        message: "Loft not found.",
      });
      return;
    }

    // Check if the user owns the loft or has been shared with
    const hasAccess =
      loft.userId === req.user.id ||
      (await prisma.sharedLoft.findFirst({
        where: {
          loftId: loft.id,
          userId: req.user.id,
        },
      }));

    if (!hasAccess) {
      res.status(403).json({
        message: "You are not authorized to access this loft.",
      });
      return;
    }

    res.status(200).json({
      message: "Loft retrieved successfully.",
      data: loft,
    });
  } catch (error) {
    console.error("Error retrieving loft:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the loft.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getSharedLofts = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  try {
    const sharedLofts = await prisma.loft.findMany({
      where: {
        sharedWith: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });
    res.status(200).json({
      message: "Shared lofts retrieved successfully.",
      data: sharedLofts,
    });
  } catch (error) {
    console.error("Error retrieving shared lofts:", error);
    res.status(500).json({
      message: "An error occurred while retrieving shared lofts.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getMyRaces = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  try {
    const validatedQuery = getRaceQueryParams.safeParse(req.query);
    if (!validatedQuery.success) {
      res.status(400).json({
        message: "Invalid query parameters.",
        error: validatedQuery.error.errors,
      });
      return;
    }
    const races = await prisma.raceEntry.findMany({
      where: {
        userId: req.user.id,
        race: {
          status: validatedQuery.data.status
            ? validatedQuery.data.status
            : undefined,
        },
      },
    });
    res.status(200).json({
      message: "Races retrieved successfully.",
      data: races,
    });
  } catch (error) {
    console.error("Error retrieving races:", error);
    res.status(500).json({
      message: "An error occurred while retrieving races.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getMyPayments = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  try {
    const payments = await prisma.payment.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        raceEntries: {
          select: {
            race: {
              select: {
                id: true,
                name: true,
                date: true,
                distanceKm: true,
                startLocation: true,
                endLocation: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      message: "Payments retrieved successfully.",
      data: payments,
    });
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(500).json({
      message: "An error occurred while retrieving payments.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const createLoft = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedBody = createLoftBody.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(400).json({
      message: "Invalid loft data.",
      error: validatedBody.error.errors,
    });
    return;
  }
  try {
    const { name, location } = validatedBody.data;

    // Use a transaction to avoid race conditions in loft ID generation
    const newLoft = await prisma.$transaction(async (tx) => {
      const loftCount = await tx.loft.count();
      const loftId = `LOFT-${loftCount + 1}`;

      return await tx.loft.create({
        data: {
          name,
          location,
          loftId,
          userId: req.user!.id,
        },
      });
    });

    res.status(201).json({
      message: "Loft created successfully.",
      data: newLoft,
    });
  } catch (error) {
    console.error("Error creating loft:", error);
    res.status(500).json({
      message: "An error occurred while creating the loft.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateLoft = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      message: "Invalid loft ID.",
      error: validatedParams.error.errors,
    });
    return;
  }
  const validatedBody = updateLoftBody.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(400).json({
      message: "Invalid loft data.",
      error: validatedBody.error.errors,
    });
    return;
  }
  try {
    const { id } = validatedParams.data;
    const { name, location } = validatedBody.data;

    // Check if the loft exists and belongs to the user
    const existingLoft = await prisma.loft.findUnique({
      where: { id },
    });

    if (!existingLoft) {
      res.status(404).json({
        message: "Loft not found.",
      });
      return;
    }

    if (existingLoft.userId !== req.user.id) {
      res.status(403).json({
        message: "You are not authorized to update this loft.",
      });
      return;
    }

    const updatedLoft = await prisma.loft.update({
      where: { id },
      data: { name, location },
    });
    res.status(200).json({
      message: "Loft updated successfully.",
      data: updatedLoft,
    });
  } catch (error) {
    console.error("Error updating loft:", error);
    res.status(500).json({
      message: "An error occurred while updating the loft.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const createBird = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      message: "Invalid loft ID.",
      error: validatedParams.error.errors,
    });
    return;
  }
  try {
    const loft = await prisma.loft.findUnique({
      where: {
        id: validatedParams.data.id,
      },
    });
    if (!loft) {
      res.status(404).json({
        message: "Loft not found.",
      });
      return;
    }

    // Check if the user owns the loft or has been shared with
    const hasAccess =
      loft.userId === req.user.id ||
      (await prisma.sharedLoft.findFirst({
        where: {
          loftId: loft.id,
          userId: req.user.id,
        },
      }));

    if (!hasAccess) {
      res.status(403).json({
        message: "You are not authorized to create birds in this loft.",
      });
      return;
    }

    const validatedBody = createBirdBody.safeParse(req.body);
    if (!validatedBody.success) {
      res.status(400).json({
        message: "Invalid bird data.",
        error: validatedBody.error.errors,
      });
      return;
    }
    const file = req.file;
    if (!file) {
      res.status(400).json({
        message: "No file uploaded.",
      });
      return;
    }
    let bird = await prisma.bird.create({
      data: {
        ...validatedBody.data,
        loftId: loft.id,
      },
    });
    const fileExtension = file.mimetype.split("/")[1];
    const key = `birds/${bird.id}.${fileExtension}`;

    await s3Client.write(key, file.buffer, {
      acl: "public-read",
    });

    const url = `${process.env.CLOUDFLARE_PUBLIC_URL}/${key}`;
    bird = await prisma.bird.update({
      where: {
        id: bird.id,
      },
      data: {
        photoUrl: url,
      },
    });
    res.status(201).json({
      message: "Bird created successfully.",
      data: bird,
    });
  } catch (error) {
    console.error("Error creating bird:", error);
    res.status(500).json({
      message: "An error occurred while creating the bird.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateBird = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      message: "Invalid bird ID.",
      error: validatedParams.error.errors,
    });
    return;
  }
  const validatedBody = updateBirdBody.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(400).json({
      message: "Invalid bird data.",
      error: validatedBody.error.errors,
    });
    return;
  }
  try {
    const { id } = validatedParams.data;
    const bird = await prisma.bird.findUnique({
      where: { id },
      include: {
        loft: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!bird) {
      res.status(404).json({
        message: "Bird not found.",
      });
      return;
    }

    // Check if the user owns the loft that contains this bird
    if (bird.loft.userId !== req.user.id) {
      res.status(403).json({
        message: "You are not authorized to update this bird.",
      });
      return;
    }

    const updatedBird = await prisma.bird.update({
      where: { id },
      data: validatedBody.data,
    });
    res.status(200).json({
      message: "Bird updated successfully.",
      data: updatedBird,
    });
  } catch (error) {
    console.error("Error updating bird:", error);
    res.status(500).json({
      message: "An error occurred while updating the bird.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const inviteToLoft = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedParams = inviteToLobyParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      message: "Invalid loft ID.",
      error: validatedParams.error.errors,
    });
    return;
  }
  const { loftid, userId } = validatedParams.data;
  try {
    const loft = await prisma.loft.findUnique({
      where: {
        id: loftid,
      },
    });
    if (!loft) {
      res.status(404).json({
        message: "Loft not found.",
      });
      return;
    }

    // Check if the user owns the loft before allowing invitations
    if (loft.userId !== req.user.id) {
      res.status(403).json({
        message: "You are not authorized to invite users to this loft.",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }
    const existingInvitation = await prisma.loftInvitation.findFirst({
      where: {
        loftId: loftid,
        invitedById: req.user.id,
        invitedUserId: userId,
      },
    });
    if (existingInvitation) {
      res.status(400).json({
        message: "Invitation already exists.",
      });
      return;
    }
    const invitation = await prisma.loftInvitation.create({
      data: {
        loftId: loftid,
        invitedById: req.user.id,
        invitedUserId: userId,
      },
    });
    res.status(201).json({
      message: "Invitation sent successfully.",
      data: invitation,
    });
  } catch (error) {
    console.error("Error inviting to loft:", error);
    res.status(500).json({
      message: "An error occurred while inviting to the loft.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const acceptLoftInvitation = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      message: "Invalid invitation ID.",
      error: validatedParams.error.errors,
    });
    return;
  }
  const { id } = validatedParams.data;
  try {
    const invitation = await prisma.loftInvitation.findUnique({
      where: { id },
    });
    if (!invitation) {
      res.status(404).json({
        message: "Invitation not found.",
      });
      return;
    }
    if (invitation.invitedUserId !== req.user.id) {
      res.status(403).json({
        message: "You are not authorized to accept this invitation.",
      });
      return;
    }
    const loft = await prisma.loft.update({
      where: { id: invitation.loftId },
      data: {
        sharedWith: {
          create: {
            userId: req.user.id,
          },
        },
      },
    });
    await prisma.loftInvitation.delete({
      where: { id },
    });
    res.status(200).json({
      message: "Invitation accepted successfully.",
      data: loft,
    });
  } catch (error) {
    console.error("Error accepting loft invitation:", error);
    res.status(500).json({
      message: "An error occurred while accepting the loft invitation.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const rejectLoftInvitation = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  const validatedParams = getIdParams.safeParse(req.params);
  if (!validatedParams.success) {
    res.status(400).json({
      message: "Invalid invitation ID.",
      error: validatedParams.error.errors,
    });
    return;
  }
  const { id } = validatedParams.data;
  try {
    const invitation = await prisma.loftInvitation.findUnique({
      where: { id },
    });
    if (!invitation) {
      res.status(404).json({
        message: "Invitation not found.",
      });
      return;
    }
    if (invitation.invitedUserId !== req.user.id) {
      res.status(403).json({
        message: "You are not authorized to reject this invitation.",
      });
      return;
    }
    await prisma.loftInvitation.delete({
      where: { id },
    });
    res.status(200).json({
      message: "Invitation rejected successfully.",
    });
  } catch (error) {
    console.error("Error rejecting loft invitation:", error);
    res.status(500).json({
      message: "An error occurred while rejecting the loft invitation.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getLoftInvitations = async (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
    return;
  }
  try {
    const invitations = await prisma.loftInvitation.findMany({
      where: {
        invitedUserId: req.user.id,
        status: "PENDING",
      },
      include: {
        loft: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
        invitedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Loft invitations retrieved successfully.",
      data: invitations,
    });
  } catch (error) {
    console.error("Error retrieving loft invitations:", error);
    res.status(500).json({
      message: "An error occurred while retrieving loft invitations.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export {
  getMyDashboard,
  getMyLofts,
  getLoftById,
  getSharedLofts,
  getMyRaces,
  getMyPayments,
  createLoft,
  updateLoft,
  createBird,
  updateBird,
  inviteToLoft,
  acceptLoftInvitation,
  rejectLoftInvitation,
  getLoftInvitations,
};
