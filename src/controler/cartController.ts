// controllers/cartController.ts
import { Request, Response } from 'express';
import { Cart } from '../models/Cart.js';

export const limparCarrinho = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    
    const carrinho = await Cart.findOneAndUpdate(
      { usuario: userId },
      { itens: [], total: 0 },
      { new: true }
    );
    
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }
    
    res.json({ message: 'Carrinho esvaziado com sucesso', carrinho });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao limpar carrinho' });
  }
};

export const obterCarrinho = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const carrinho = await Cart.findOne({ usuario: userId }).populate('itens.produto');
    
    res.json(carrinho || { itens: [], total: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter carrinho' });
  }
};