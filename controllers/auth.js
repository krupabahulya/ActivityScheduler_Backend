import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

export const signUpUser = asyncHandler(async (req, res) => {
  //Get JSON body from request
  const { body } = req;
  //Check if the user already exists
  const found = await User.findOne({ email: body.email });
  if (found) throw new ErrorResponse("Email already taken 😔");
  // Hash password
  const hash = await bcrypt.hash(body.password, 5);
  //Create a new user in the database
  const { _id } = await User.create({ ...body, password: hash });
  //Sign a token (with the user id)
  const token = jwt.sign({ _id }, process.env.JWT_SECRET);
  //Return token
  res.status(201).json({ token });
});

export const signInUser = asyncHandler(async (req, res) => {
  //Get JSON body from request
  const {
    body: { email, password },
  } = req;
  //Check if the user exists
  const found = await User.findOne({ email }).select("+password");
  if (!found) throw new ErrorResponse("User does not exist");
  //Compare passwords
  const match = await bcrypt.compare(password, found.password);
  if (!match) throw new ErrorResponse("Password is incorrect");
  //Sign a token (with the user id)
  const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET);
  //Return token
  res.status(201).json({ token });
});

export const getUser = (req, res) => {
  res.json(req.user);
};
