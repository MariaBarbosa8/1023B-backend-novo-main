import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/User";
import { jwtSecret } from "../config/jwt.ts";

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada,
      tipo: tipo || "user",
    });

    await novoUsuario.save();
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });

    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo },
      jwtSecret,
      { expiresIn: "2h" }
    );

    res.status(200).json({ mensagem: "Login bem-sucedido", token });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
};