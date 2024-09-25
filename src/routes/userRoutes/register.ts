import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { UserRepository } from '../../repositories/user';
import { container } from 'tsyringe';

export default async function register (req: Request, res: Response) {
    const { email, password } = req.body;
    const userService = container.resolve(UserService);
    try {
        const result = await userService.register(email, password);
        res.status(201).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error });
    } 
}