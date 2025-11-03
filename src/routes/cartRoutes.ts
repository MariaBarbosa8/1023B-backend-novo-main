// routes/cartRoutes.ts
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as cartController from '../controler/cartController.js';

const router = express.Router();

router.use(authMiddleware); // Todas as rotas exigem autenticação

router.get('/', cartController.obterCarrinho);
router.delete('/', cartController.limparCarrinho); // B3 - Excluir carrinho inteiro

export default router;