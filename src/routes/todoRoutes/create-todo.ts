import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/user';
import { TodoRepository } from '../../repositories/todo';
import TodoService from '../../services/todoService';

export default async function createTodo (req: Request, res: Response) {
    const todoService = new TodoService({
        todoRepository: TodoRepository,
        userRepository: UserRepository
    });
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