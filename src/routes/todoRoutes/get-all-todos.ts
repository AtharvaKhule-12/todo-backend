import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/user';
import { TodoRepository } from '../../repositories/todo';
import TodoService from '../../services/todoService';
import { container } from 'tsyringe';

export default async function getAllTodos(req: Request, res: Response) {
    const todoService: TodoService = container.resolve("TodoService");
    const todos = await todoService.getAllTodos(req.session.userId);
    res.json(todos);
}