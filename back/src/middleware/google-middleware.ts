import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import fs, { PathLike } from "fs";
import { drive_v3, google } from "googleapis";
import { GaxiosPromise } from "googleapis/build/src/apis/abusiveexperiencereport";

const googleMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      const OAuth2 = google.auth.OAuth2;
      const promises: Promise<
        | { id: string; originalName: string }
        | { id: string | null | undefined; originalName: any }
      >[] = [];
      const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );
      new OAuth2({});
      //   console.log("reqqqq", req);
      console.log("fajloviii", req.files);
      oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

      console.log("bodiii", req.body);

      const drive = google.drive({
        version: "v3",
        auth: oauth2Client,
      });
      const filesData = Object.values(req.files!)[0] as any;
      filesData.forEach((file: any) => {
        const fileMetadata = {
          name: file.originalname + randomUUID(),
          parents: ["1v7vaz8OSpNdjpUk_OjcUxT1y3e1IyH_w"],
        };
        const media = {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path as PathLike),
        };
        promises.push(
          drive.files
            .create({
              requestBody: fileMetadata,
              media: media,
              fields: "id",
            })
            .then((response) => {
              return {
                id: response.data.id,
                originalName: file.originalname,
              };
            })
        );
      });

      req.promises = promises;
      return next();
    } catch (e) {
      next(e);
    }
  };

export default googleMiddleware;
