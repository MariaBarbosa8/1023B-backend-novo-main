// controllers/userController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwt.js'; // Use a mesma chave!
import User from '../models/User'; // Assuma seu modelo de usuário Mongoose

// Use a interface CustomRequest do seu middleware para tipagem correta
import { JwtPayload } from '../middlewares/auth.middleware.js'; 

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });

        // 1. Verificação de credenciais (Ajuste conforme seu modelo)
        if (!user || !(await user.comparePassword(senha))) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Determinar o TIPO de usuário (Requisito A1)
        // Assumindo que seu modelo tem um campo booleano 'isAdmin'
        const userRole: JwtPayload['tipo'] = user.isAdmin ? "admin" : "user"; 

        // 3. Criar o payload do token
        const payload: JwtPayload = {
            id: user._id.toString(), // Converte Object ID para string
            tipo: userRole          // <--- CAMPO ESSENCIAL PARA O MIDDLEWARE!
        };

        // 4. Assinar o token
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '1d' // Defina o tempo de expiração
        });

        // 5. Enviar o token e o tipo para o frontend
        res.json({ 
            token, 
            message: 'Login realizado com sucesso!',
            tipo: userRole // Útil para o frontend
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};