import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const generateJWT = (id:string, name:string) => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) throw new Error("Clé secrète introuvable");

  return jwt.sign({ id, name }, secretKey, {
    expiresIn: "2h",
  });
};

export const getCinephileFromToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  const currentTime = Math.floor(Date.now() / 1000);

  if (!decoded || !decoded.exp || currentTime > decoded.exp) {
    return null;
  }

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) throw new Error("Clé secrète introuvable");

  jwt.verify(token, secretKey);

  return decoded.id;
};

export async function validateToken(token: string): Promise<{ token: string; cinephileId: string } | null> {
  try {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) throw new Error("Clé secrète introuvable");

    const decodedToken = jwt.decode(token) as { id: string; exp: number } | null;
    if (!decodedToken) return null;

    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > decodedToken.exp) {
      return null;
    }

    jwt.verify(token, secretKey);
    return { token, cinephileId: decodedToken.id };
  } catch {
    return null;
  }
}

