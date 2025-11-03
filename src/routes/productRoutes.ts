import express from "express";
// Remova o .js/ts na importação do middleware (se for .ts)
import { autenticar, verificarAdmin, CustomRequest } from "../middlewares/authMiddleware.js"; 
// Mude para o nome da função em camelCase, e verifique o caminho da pasta
import { criarProduto } from "../controler/productController.js"; 

const router = express.Router();

router.post(
    "/produtos", 
    autenticar,     
    verificarAdmin, 
    criarProduto    // Use o nome corrigido aqui
);

export default router;