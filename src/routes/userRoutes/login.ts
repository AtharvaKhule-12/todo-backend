import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { UserRepository } from '../../repositories/user';

export default async function login (req: Request, res: Response) {
    const { email, password } = req.body;
    const userService = new UserService({
        userRepository: UserRepository
    });
    const result = await userService.login(email, password);
    
    if (result.userId) {
        req.session.userId = result.userId;
        res.json({ message: result.message });
    } else {
        res.status(401).json({ message: result.message });
    } 
}