import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

export default router;