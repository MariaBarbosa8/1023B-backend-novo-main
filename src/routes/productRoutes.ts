import express from "express";
import { listarProdutos, cadastrarProduto } from "../controllers/productController";
import { autenticar, verificarAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", listarProdutos);
router.post("/", autenticar, verificarAdmin, cadastrarProduto);

export default router;