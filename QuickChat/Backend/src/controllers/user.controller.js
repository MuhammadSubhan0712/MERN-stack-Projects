import User from "../models/user.model";
import bcrypt from "bcryptjs";

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

    const token = 
  } catch (error) {}
};
