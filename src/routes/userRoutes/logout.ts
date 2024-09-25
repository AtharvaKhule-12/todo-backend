import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { UserRepository } from '../../repositories/user';
import { container } from 'tsyringe';

export default async function logout (req: Request, res: Response) {
    const userService = container.resolve(UserService);
    userService.logout(req, res);
}