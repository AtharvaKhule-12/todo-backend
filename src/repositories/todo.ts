import { AppDataSource } from "../data-source";
import { Todo } from "../entity/todo";

export const TodoRepository = AppDataSource.getRepository(Todo);