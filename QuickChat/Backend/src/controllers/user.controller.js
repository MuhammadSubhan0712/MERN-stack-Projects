import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";

// Signup new user:
export const signup = async () => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({
        message: "Missing details",
        success: false,
      });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "Account already exist",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error created account",
      error,
    });
  }
};

// To login user:
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(process, userData.password);

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(userData._id);

    res.json({
      success: true,
      userData,
      token,
      message: "Login successfully",
    });
  } catch (error) {}
  res.json({
    success: false,
    message: "Error login account",
    error,
  });
};

// User's Authentication check:
export const checkAuth = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
