import { randomUUID } from "crypto";
import { Request, Response, NextFunction, response } from "express";
import { drive_v3, google } from "googleapis";
import fs, { PathLike } from "fs";
import { generateImageUrl } from "../util/generate-image-url";
import { GaxiosPromise } from "googleapis/build/src/apis/abusiveexperiencereport";
import { prisma } from "../util/prisma-client";
import { generateDownloadUrl } from "../util/generate-download-url";
import { IdQueryDto } from "../dto/tourist-spot-dto";
import { OAuth2Client } from "google-auth-library";
import { deleteImageFromGoogleDrive } from "../util/delete-from-drive";
import HttpException from "../util/http-exception";

export const uploadImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageURLs = (await Promise.all(req.promises)).map((response) => {
      return { imageURL: generateImageUrl(response.id!), ...req.body };
    });
    const resImages = await prisma.image.createMany({ data: imageURLs });
    res.status(200).json(resImages);
  } catch (e) {
    next(e);
  }
};

export const uploadFilesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fileURLs = (await Promise.all(req.promises)).map((response) => {
      return {
        docURL: generateDownloadUrl(response.id!),
        ...req.body,
        name: response.originalName,
      };
    });
    const resDocs = await prisma.document.createMany({ data: fileURLs });
    res.status(200).json(resDocs);
  } catch (e) {
    next(e);
  }
};

export const deleteDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const docId = (req.query as unknown as IdQueryDto).id;

    const document = await prisma.document.findFirst({ where: { id: docId } });
    if (!document) throw new HttpException(404, "File not found");
    const auth = getGoogleDriveAuth();
    const fileId = document.docURL.split("&id=")[1];

    await deleteImageFromGoogleDrive(fileId as unknown as string, auth);

    const deletedFile = await prisma.document.delete({ where: { id: docId } });

    res.status(200).json(deletedFile);
  } catch (e) {
    next(e);
  }
};

export const deleteImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageId = (req.query as unknown as IdQueryDto).id;

    const image = await prisma.image.findFirst({ where: { id: imageId } });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const auth = getGoogleDriveAuth();
    const imageDriveId = image.imageURL.split("?id=")[1];
    const imageDriveIdFinal = imageDriveId.split("&")[0];
    await deleteImageFromGoogleDrive(
      imageDriveIdFinal as unknown as string,
      auth
    );

    const deletedImage = await prisma.image.delete({
      where: { id: imageId },
    });
    res.status(200).json(deletedImage);
  } catch (e) {
    next(e);
  }
};

function getGoogleDriveAuth() {
  // Replace these with your credentials
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const oAuth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  // Assuming the token is stored somewhere secure and retrieved here
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  return oAuth2Client;
}
