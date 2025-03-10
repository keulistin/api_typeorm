import { Router, Request, Response } from "express";
import { UserService } from "../services/user.services";

const router = Router();
const userService = new UserService();

router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        await userService.createUser(req.body);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.get("/", async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        await userService.updateUser(Number(req.params.id), req.body);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        await userService.deleteUser(Number(req.params.id));
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
