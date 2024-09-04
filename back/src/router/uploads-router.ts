import express from "express";
import authorize from "../middleware/auth-middleware";
import { Role } from "@prisma/client";
import multer from "multer";
import {
  deleteImageController,
  uploadFilesController,
  uploadImageController,
} from "../controller/uploads-controller";
import googleMiddleware from "../middleware/google-middleware";
import validate from "../middleware/validation-middleware";
import { getByIdSchema } from "../schemas/tourist-spot-schema";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/images",
  authorize([Role.ADMIN, Role.USER]),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "tourismPotentialId" },
    { name: "newsArticleId" },
  ]),
  googleMiddleware(),
  uploadImageController
);
router.post(
  "/files",
  authorize([Role.ADMIN, Role.USER]),
  upload.fields([
    { name: "docs", maxCount: 10 },
    { name: "tourismPotentialId" },
    { name: "newsArticleId" },
  ]),
  googleMiddleware(),
  uploadFilesController
);

router.delete(
  "/deleteImage",
  authorize([Role.ADMIN, Role.USER]),
  validate(getByIdSchema),
  deleteImageController
);

export default router;
