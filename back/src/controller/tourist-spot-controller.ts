import { prisma } from "../util/prisma-client";
import {
  AddCoordinatesDto,
  AddSpotDto,
  AddVideosDto,
  IdQueryDto,
  UpdateSpotDto,
} from "../dto/tourist-spot-dto";
import { Request, Response, NextFunction } from "express";
import HttpException from "../util/http-exception";

export const addTouristSpotController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const spotData = req.body as AddSpotDto;
  try {
    const newSpot = await prisma.tourismPotential.create({
      data: {
        ...spotData,
        userId: req.user.id!,
      },
    });

    res.status(200).json(newSpot);
  } catch (e) {
    next(e);
  }
};
export const addVideosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestData = req.body as AddVideosDto;

    const spot = await prisma.tourismPotential.findFirst({
      where: { id: requestData.tourismPotentialId },
    });
    if (!spot) throw new HttpException(404, "Tourist spot not found");
    if (req.user.role! != "ADMIN" && req.user.id != spot.userId)
      throw new HttpException(401, "Unauthorized");
    const formattedData = requestData.videos.map((videoData) => {
      return {
        videoURL: videoData,
        tourismPotentialId: requestData.tourismPotentialId,
      };
    });

    const videos = await prisma.videoMaterials.createMany({
      data: formattedData,
    });
    res.status(200).json(videos);
  } catch (e) {
    next(e);
  }
};
export const addCoordinatesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestData = req.body as AddCoordinatesDto;
    const spot = await prisma.tourismPotential.findFirst({
      where: { id: requestData.tourismPotentialId },
    });

    if (!spot) throw new HttpException(404, "Not found");
    if (req.user.role! != "ADMIN" && req.user.id != spot.userId)
      throw new HttpException(401, "Unauthorized");

    await prisma.geoCoordinates.deleteMany({
      where: { tourismPotentialId: requestData.tourismPotentialId },
    });
    const formattedData = requestData.coordinates.map((item) => {
      return {
        tourismPotentialId: requestData.tourismPotentialId,
        lat: item.lat,
        lon: item.lon,
      };
    });
    const resData = await prisma.geoCoordinates.createMany({
      data: formattedData,
    });

    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

export const getAllSpotsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const touristSpots = await prisma.tourismPotential.findMany({
      include: { type: { select: { name: true, color: true } } },
    });

    const formattedResponse = touristSpots.map((spot) => ({
      id: spot.id,
      name: spot.name,
      type: spot.type.name,
      color: spot.type.color,
      lat: spot.lat,
      lon: spot.lon,
    }));

    res.status(200).json(formattedResponse);
  } catch (e) {
    next(e);
  }
};

export const getSpotTypesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spotTypes = await prisma.potentialType.findMany();

    res.status(200).json(spotTypes);
  } catch (e) {
    next(e);
  }
};

export const getSpotsTableController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let spots;
    if (req.user.role === "ADMIN") {
      console.log("admineeee");
      spots = await prisma.tourismPotential.findMany({
        include: { type: true, user: true },
        orderBy: { name: "asc" },
      });
    } else {
      spots = await prisma.tourismPotential.findMany({
        where: { userId: req.user.id },
        include: { type: true, user: true },
        orderBy: { name: "asc" },
      });
    }

    const formattedResponse = spots.map((spot) => {
      return {
        id: spot.id,
        Ime: spot.name,
        Tip: spot.type.name,
        Dodao: spot.user.email,
      };
    });

    res.status(200).json(formattedResponse);
  } catch (e) {
    next(e);
  }
};

export const getSpotByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spotId = (req.query as unknown as IdQueryDto).id;
    const spot = await prisma.tourismPotential.findFirst({
      where: { id: spotId },
      include: {
        Document: true,
        Image: true,
        type: true,
        VideoMaterials: true,
        GeoCoordinates: true,
      },
    });

    if (!spot) throw new HttpException(404, "Spot not found");

    res.status(200).json(spot);
  } catch (e) {
    next(e);
  }
};
export const removeVideosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spotId = (req.query as unknown as IdQueryDto).id;

    const deletedVideos = await prisma.videoMaterials.deleteMany({
      where: { tourismPotentialId: spotId },
    });

    res.status(200).json(deletedVideos);
  } catch (e) {
    next(e);
  }
};

export const updateSpotController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spotData = req.body as UpdateSpotDto;
    const spotId = (req.query as unknown as IdQueryDto).id;

    const newSpot = await prisma.tourismPotential.update({
      where: { id: spotId },
      data: spotData,
    });

    res.status(200).json(newSpot);
  } catch (e) {
    next(e);
  }
};

export const deleteCoordinatesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spotId = (req.query as unknown as IdQueryDto).id;

    const deletedCoordinates = await prisma.geoCoordinates.deleteMany({
      where: { tourismPotentialId: spotId },
    });

    res.status(200).json(deletedCoordinates);
  } catch (e) {
    next(e);
  }
};

export const deleteSpotController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spotId = (req.query as unknown as IdQueryDto).id;
    const deletedSpot = await prisma.tourismPotential.delete({
      where: { id: spotId },
    });

    res.status(200).json(deletedSpot);
  } catch (e) {
    next(e);
  }
};

export const getCountsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spotsCount = await prisma.tourismPotential.count();
    const newsCount = await prisma.newsArticle.count();
    const usersCount = await prisma.user.count();

    const response = {
      spots: spotsCount,
      news: newsCount,
      users: usersCount,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
