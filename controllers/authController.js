import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { name, email, password, type } = req.body;
  // hash password SHA 256
  const hashedPassword = await bcrypt.hash(password, 10);
  // database insert
  try {
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type,
      },
    });

    if (createdUser == null) {
      return res.status(400).json({ isSuccess: false, message: "Bad Request" });
    }
    // send response
    return res.status(201).json({ isSuccess: true, createdUser });
  } catch (e) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // email match
    if (user == null) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Invalid Email" });
    }

    // password match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Invalid Password" });
    }

    // generate token
    const token = generateToken(user);
    res.cookie("jwt", token, {
      expiresIn: 30 * 24 * 60 * 60,
      httpOnly: true,
    });
    res
      .status(200)
      .json({ isSuccess: true, message: "Login Success", user: user });
  } catch (e) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
}

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: "30d",
  });
}

// jwt
// header
// payload
// signature
