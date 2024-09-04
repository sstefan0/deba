import express from "express";
import authorize from "../middleware/auth-middleware";
import { Role } from "@prisma/client";
import {
  addNewsController,
  deleteNewsController,
  getArticleByIdController,
  getNewsAdminController,
  getNewsController,
  newsCountController,
  updateNewsController,
} from "../controller/news-controller";
import validate from "../middleware/validation-middleware";
import {
  addNewsSchema,
  getNewsSchema,
  updateNewsSchema,
} from "../schemas/news-schema";
import { getByIdSchema } from "../schemas/tourist-spot-schema";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport";

const router = express.Router();

router.post(
  "/add",
  authorize([Role.ADMIN, Role.USER]),
  validate(addNewsSchema),
  addNewsController
);

router.put(
  "/update",
  authorize([Role.ADMIN, Role.USER]),
  validate(updateNewsSchema),
  updateNewsController
);

router.delete(
  "/delete",
  authorize([Role.ADMIN, Role.USER]),
  validate(getByIdSchema),
  deleteNewsController
);

router.get("/getPublic", validate(getNewsSchema), getNewsController);
router.get(
  "/getByUser",
  authorize([Role.ADMIN, Role.USER]),
  validate(getNewsSchema),
  getNewsAdminController
);
router.get("/getById", validate(getByIdSchema), getArticleByIdController);
router.get("/getCount", newsCountController);

export default router;
