import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { UserRepository } from '../../repositories/user';

export default async function logout (req: Request, res: Response) {
    const userService = new UserService({
        userRepository: UserRepository
    });
    userService.logout(req, res);
}