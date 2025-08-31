import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// POST /api/users/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password, isAdmin: !!isAdmin });
    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } catch (e) { next(e); }
};

// POST /api/users/login
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    }
    res.status(401);
    throw new Error("Invalid email or password");
  } catch (e) { next(e); }
};

// GET /api/users/profile  (protected)
export const getUserProfile = async (req, res, next) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin
    });
  } catch (e) { next(e); }
}
