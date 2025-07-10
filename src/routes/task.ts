import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

const router = Router();
const taskRepository = AppDataSource.getRepository(Task);
const userRepository = AppDataSource.getRepository(User);

// POST /task - Create a new task
router.post("/", async (req, res) => {
    try {
        const { name, description, userId } = req.body;

        if (!name || !description || !userId) {
            return res.status(400).json({
                message: "Bad request",
                requiredFields: ["name", "description", "userId"],
                received: {
                    name: name || "missing",
                    description: description || "missing",
                    userId: userId || "missing"
                }
            });
        }

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTask = taskRepository.create({
            name,
            description,
            assignedUser: user
        });

        await taskRepository.save(newTask);

        return res.status(201).json({
            id: newTask.id,
            name: newTask.name,
            description: newTask.description,
            assignedUserId: newTask.assignedUser.id
        });

    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error
        });
    }
});

// GET /task - Get all tasks with user information
router.get("/", async (req, res) => {
    try {
        const tasks = await taskRepository.find({
            relations: ["assignedUser"],
            select: {
                id: true,
                name: true,
                description: true,
                assignedUser: {
                    id: true,
                    name: true
                }
            }
        });

        return res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error
        });
    }
});

// GET /task/:id - Get a specific task by ID
router.get("/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const task = await taskRepository.findOne({
            where: { id: taskId },
            relations: ["assignedUser"],
            select: {
                id: true,
                name: true,
                description: true,
                assignedUser: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error
        });
    }
});

// DELETE /task/:id - Delete a task
router.delete("/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const result = await taskRepository.delete(taskId);

        if (result.affected === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(204).send(); // No content response for successful deletion

    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});

// PUT /task/:id - Update a task
router.put("/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const { name, description, userId } = req.body;
        
        const task = await taskRepository.findOne({
            where: { id: taskId },
            relations: ["assignedUser"]
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (name !== undefined) task.name = name;
        if (description !== undefined) task.description = description;
        
        if (userId !== undefined) {
            const user = await userRepository.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            task.assignedUser = user;
        }

        await taskRepository.save(task);

        return res.json({
            id: task.id,
            name: task.name,
            description: task.description,
            assignedUserId: task.assignedUser.id
        });

    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            message: "Internal server error",
            error:error
        });
    }
});

export default router;