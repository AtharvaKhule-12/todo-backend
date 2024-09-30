import { Request, Response } from 'express';
import TodoService from '../../services/todoService';
import { container } from '../../app';

export default async function createTodo (req: Request, res: Response) {
    const todoService: TodoService = container.resolve("TodoService");
    const { title } = req.body;
    let todo;   
    try {
        todo = await todoService.createTodo(title, req.session.userId);
    } catch (error) {
        if(error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
    res.json(todo);
}