import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Function to generate a token for a user:
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};

export default generateToken;
