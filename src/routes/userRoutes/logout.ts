import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { container } from '../../app';

export default async function logout (req: Request, res: Response) {
    const userService: UserService = container.resolve("UserService");
    userService.logout(req, res);
}