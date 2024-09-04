import express from "express";
import {
  addCoordinatesController,
  addTouristSpotController,
  addVideosController,
  deleteCoordinatesController,
  deleteSpotController,
  getAllSpotsController,
  getCountsController,
  getSpotByIdController,
  getSpotsTableController,
  getSpotTypesController,
  removeVideosController,
  updateSpotController,
} from "../controller/tourist-spot-controller";
import authorize from "../middleware/auth-middleware";
import { Role } from "@prisma/client";
import validate from "../middleware/validation-middleware";
import {
  addCoordinatesSchema,
  addVideosSchema,
  getByIdSchema,
  updateSpotSchema,
} from "../schemas/tourist-spot-schema";

const router = express.Router();

router.post(
  "/create",
  authorize([Role.ADMIN, Role.USER]),
  addTouristSpotController
);
router.post(
  "/addVideos",
  authorize([Role.ADMIN, Role.USER]),
  validate(addVideosSchema),
  addVideosController
);
router.post(
  "/addCoordinates",
  authorize([Role.ADMIN, Role.USER]),
  validate(addCoordinatesSchema),
  addCoordinatesController
);

router.get("/getAll", getAllSpotsController);
router.get("/getTypes", getSpotTypesController);
router.get(
  "/getAllTable",
  authorize([Role.ADMIN, Role.USER]),
  getSpotsTableController
);
router.get("/getById", validate(getByIdSchema), getSpotByIdController);
router.get(
  "/getCounts",
  authorize([Role.ADMIN, Role.USER]),
  getCountsController
);

router.put(
  "/update",
  authorize([Role.ADMIN, Role.USER]),
  validate(updateSpotSchema),
  updateSpotController
);

router.delete(
  "/deleteVideos",
  authorize([Role.ADMIN, Role.USER]),
  validate(getByIdSchema),
  removeVideosController
);
router.delete(
  "/deleteCoordinates",
  validate(getByIdSchema),
  authorize([Role.ADMIN, Role.USER]),
  deleteCoordinatesController
);
router.delete(
  "/delete",
  validate(getByIdSchema),
  authorize([Role.ADMIN, Role.USER]),
  deleteSpotController
);
export default router;
