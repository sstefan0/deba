import { Request, Response, NextFunction } from "express";
import HttpException from "../util/http-exception";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

const authorize =
  (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.header("Authorization");

      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
        throw new HttpException(401, "Unauthorized.");

      const token = authorizationHeader.replace("Bearer ", "");

      if (!token) throw new HttpException(401, "Auth token not found.");

      const decoded = jwt.verify(token, (process.env as any).JWT_SECRET);

      (req as any).user = decoded;

      let authorized = false;
      if (!roles.length) authorized = true;

      roles.forEach((role) => {
        if (role == (req as any).user.role) authorized = true;
      });

      if (!authorized) throw new HttpException(401, "Unauthorized.");
      return next();
    } catch (e) {
      next(e);
    }
  };

export default authorize;
