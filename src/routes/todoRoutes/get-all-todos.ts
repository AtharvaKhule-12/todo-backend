import { Request, Response } from 'express';
import TodoService from '../../services/todoService';
import { container } from '../../app';

export default async function getAllTodos(req: Request, res: Response) {
    const todoService: TodoService = container.resolve("TodoService");
    const todos = await todoService.getAllTodos(req.session.userId);
    res.json(todos);
}