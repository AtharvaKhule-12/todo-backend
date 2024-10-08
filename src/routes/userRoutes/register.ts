import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { container } from '../../app';

export default async function register (req: Request, res: Response) {
    const { email, password } = req.body;
    const userService: UserService = container.resolve("UserService");
    try {
        const result = await userService.register(email, password);
        res.status(201).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error });
    } 
}