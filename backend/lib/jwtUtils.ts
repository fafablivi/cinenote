import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const generateJWT = (id: string, name: string) => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) throw new Error("Clé secrète introuvable");

  return jwt.sign({ id, name }, secretKey, {
    expiresIn: "2h",
  });
};

