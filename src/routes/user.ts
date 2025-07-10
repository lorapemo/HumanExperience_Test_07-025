import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: "Bad request, name or email or password not found" 
            });
        }

        const newUser = userRepository.create({ name, email, password });
        await userRepository.save(newUser);
        return res.status(201).json({ user: newUser });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await userRepository.find();
        return res.json(users);
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE /user/:id - Delete a task
router.delete("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const result = await userRepository.delete(userId);

        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(204).send(); 

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});

export default router;