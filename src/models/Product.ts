import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  nome: string;
  preco: number;
  categoria: string;
  imagem?: string;
}

const ProductSchema = new Schema<IProduct>({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  categoria: { type: String, required: true },
  imagem: { type: String },
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);