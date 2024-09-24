import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/user';
import { TodoRepository } from '../../repositories/todo';
import TodoService from '../../services/todoService';

export default async function deleteTodo (req: Request, res: Response) {
    const todoService = new TodoService({
        todoRepository: TodoRepository,
        userRepository: UserRepository
    });
    const { id } = req.params;
    try {
        const result = await todoService.deleteTodo(id, req.session.userId);
        res.json(result);
    } catch (error) {
        if(error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}