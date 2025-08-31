import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }
      return next();
    } catch (err) {
      res.status(401);
      return next(new Error("Not authorized, token failed"));
    }
  }
  res.status(401);
  next(new Error("Not authorized, no token"));
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  res.status(403);
  next(new Error("Admin access only"));
};
