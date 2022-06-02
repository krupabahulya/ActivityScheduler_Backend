import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import activity from "../models/activity.js";

export const getAllActivities = asyncHandler(async (req, res, next) => {
  const activities = await activity.find().populate("creator");
  res.json(activities);
});

export const createActivity = asyncHandler(async (req, res) => {
  const {
    body,
    user: { _id: creator },
  } = req;
  let newactivity = await activity.create({ ...body, creator });
  newactivity = await newactivity.populate("creator");
  res.status(201).json(newactivity);
});

export const getSingleActivity = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const activity = await activity.findById(id);
  if (!activity)
    throw new ErrorResponse(`activity with id of ${id} doesn't exist`, 404);
  res.send(activity);
});

export const updateActivity = asyncHandler(async (req, res) => {
  const {
    body,
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await activity.findById(id);
  if (!found)
    throw new ErrorResponse(`activity with id of ${id} doesn't exist`, 404);
  if (found.creator.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the activity can edit`, 403);
  const updatedActivity = await activity.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.json(updatedActivity);
});

export const deleteActivity = asyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await activity.findById(id);
  if (!found)
    throw new ErrorResponse(`activity with id of ${id} doesn't exist`, 404);
  if (found.creator.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the activity can delete`, 403);
  found.des;
  await activity.deleteOne({ _id: id });
  res.json({ success: `activity with id of ${id} was deleted` });
});
