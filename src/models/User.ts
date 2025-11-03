import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  tipo: "admin" | "user";
}

const UserSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ["admin", "user"], default: "user" },
});

export const User = mongoose.model<IUser>("User", UserSchema);