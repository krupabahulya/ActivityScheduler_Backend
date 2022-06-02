import { Router } from "express";
import {
  createActivity,
  deleteActivity,
  getAllActivities,
  getSingleActivity,
  updateActivity,
} from "../controllers/activities.js";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";
import { activity } from "../joi/schemas.js";

const activitiesRouter = Router();

activitiesRouter
  .route("/")
  .get(getAllActivities)
  .post(verifyToken, validateJOI(activity), createActivity);

activitiesRouter
  .route("/:id")
  .get(getSingleActivity)
  .put(verifyToken, validateJOI(activity), updateActivity)
  .delete(verifyToken, deleteActivity);

export default activitiesRouter;
