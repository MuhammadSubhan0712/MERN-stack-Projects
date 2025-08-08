import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// Signup new user:
export const signup = async (req, res) => {
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
    });
    console.log(error.message);
  }
};

// To login user:
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email: req.body.email });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

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
  } catch (error) {
    res.json({
      success: false,
      message: "Error login account",
    });
    console.log(error.message);
  }
};

// User's Authentication check:
export const checkAuth = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// to update user profile details:
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    let profilePicUrl;

    if (profilePic) {
      const uploadResult = await cloudinary.uploader.upload(profilePic, {
        folder: "chat_app_profile_pics",
        // resource_type: "auto",
      });
      profilePicUrl = uploadResult.secure_url;
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        ...(profilePicUrl && { profilePic: profilePicUrl }),
      },
      { new: true }
    );

    res.json({
      success: true,
      user: updateUser,
    });
  } catch (error) {
    console.log("Error occured to update profile ==>", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
