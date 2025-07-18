import jwt from "jsonwebtoken";

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

export default generateToken;
