import jwt from "jsonwebtoken";
import { prisma } from "../db.js";

export async function isAuth(req, res, next) {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
}
