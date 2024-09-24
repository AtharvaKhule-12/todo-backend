import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/user';
import { TodoRepository } from '../../repositories/todo';
import TodoService from '../../services/todoService';

export default async function getAllTodos(req: Request, res: Response) {
    const todoService = new TodoService({
        todoRepository: TodoRepository,
        userRepository: UserRepository
    });
    const todos = await todoService.getAllTodos(req.session.userId);
    res.json(todos);
}