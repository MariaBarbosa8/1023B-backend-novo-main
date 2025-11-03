import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwt";

export interface JwtPayload {
  id: string;
  tipo: "admin" | "user";
}

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.body.user = decoded;
    next();
  } catch {
    return res.status(403).json({ erro: "Token inválido" });
  }
};

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user as JwtPayload;

  if (user.tipo !== "admin") {
    return res.status(403).json({ erro: "Acesso negado. Apenas administradores podem realizar esta ação." });
  }

  next();
};
