import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use("/users", userRoutes);
app.use("/produtos", productRoutes);

// conexão MongoDB
mongoose
  .connect("mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/marketplace")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

const PORT = 5123;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
