// middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwt.js"; 

export interface JwtPayload {
    id: string;
    tipo: "admin" | "user";
}

export interface CustomRequest extends Request {
    user?: JwtPayload;
}

/**
 * Middleware para verificar se o token é válido e anexar o payload à requisição.
 */
export const autenticar = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

    // Espera o formato "Bearer <token>"
    const [, token] = authHeader.split(" "); 

    try {
        // A LINHA QUE ESTAVA DANDO PROBLEMA:
        // A CHAVE SECRETA (jwtSecret) AQUI DEVE SER EXATAMENTE A MESMA USADA NO LOGIN.
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        
        req.user = decoded; 
        next();
    } catch (e) {
        // Envia um erro de volta se a chave secreta não bater ou o token expirar
        console.error("Erro na verificação do JWT:", e);
        return res.status(403).json({ erro: "Token inválido ou expirado" });
    }
};

/**
 * Middleware para verificar se o usuário autenticado possui o tipo 'admin'.
 */
export const verificarAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user; 
    
    if (!user || user.tipo !== "admin") {
        return res.status(403).json({ erro: "Acesso negado. Apenas administradores podem realizar esta ação." });
    }

    next();
};