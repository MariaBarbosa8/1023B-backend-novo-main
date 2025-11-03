import { Request, Response } from "express";
import { Product } from "../models/Product";

export const listarProdutos = async (req: Request, res: Response) => {
  const produtos = await Product.find();
  res.json(produtos);
};

export const cadastrarProduto = async (req: Request, res: Response) => {
  try {
    const produto = await Product.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar produto" });
  }
};
