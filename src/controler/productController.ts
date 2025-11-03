import express from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import * as productController from '../controller/productController.js';

const router = express.Router();

// Rota pública
router.get('/', productController.listarProdutos);

// Rotas protegidas apenas para admin - C5
router.post('/', authMiddleware, adminMiddleware, productController.cadastrarProduto);
router.put('/:id', authMiddleware, adminMiddleware, productController.editarProduto);
router.delete('/:id', authMiddleware, adminMiddleware, productController.excluirProduto);

export default router;