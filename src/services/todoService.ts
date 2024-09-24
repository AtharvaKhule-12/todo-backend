import { AppDataSource } from "../data-source";
import { Todo } from "../entity/todo";
import { User } from "../entity/user";
import { IsNull, UpdateResult } from "typeorm";
import { TodoRepository } from "../repositories/todo";
import { UserRepository } from "../repositories/user";

type InjectedDependencies = {
  todoRepository: typeof TodoRepository;
  userRepository: typeof UserRepository;
};

class TodoService {
  private readonly todoRepository_: typeof TodoRepository;
  private readonly userRepository_: typeof UserRepository;

  constructor({todoRepository, userRepository}: InjectedDependencies) {
    this.todoRepository_ = todoRepository;
    this.userRepository_ = userRepository;
  }

  async getAllTodos(userId: any): Promise<Todo[]> {
    try {
        return await this.todoRepository_.find({
          where: { user: { id: userId }, deletedAt: IsNull() },
        });
      } catch (error) {
        console.error(error);
        return [];
      }
  }

  async createTodo(title: string, userId: any): Promise<Todo> {
    let user: User | null;
    try {
        user = await this.userRepository_.findOneBy({ id: userId });
    } catch (error) {
        throw new Error("Error occuring while fetching user");
    }
    if (user) {
      const todo = new Todo();
      todo.title = title;
      todo.user = user;
      await this.todoRepository_.save(todo);
      return todo;
    } else {
      throw new Error("User not found");
    }
  }

  async updateTodo(id: string, title: string, completed: boolean, userId: any): Promise<Todo> {
    let todo: Todo | null;
    try {
        todo = await this.todoRepository_.findOne({
            where: { id: id.toString(), user: { id: userId } },
        });
    } catch (error) {
        throw new Error("Error occuring while fetching todo");
    }
    if (todo) {
      todo.title = title || todo.title;
      todo.completed = completed !== undefined ? completed : todo.completed;
      await this.todoRepository_.save(todo);
      return todo;
    } else {
      throw new Error("Todo not found");
    }
  }

  async deleteTodo(id: string, userId: any): Promise<UpdateResult> {
    let todo: Todo | null;
    try {
        todo = await this.todoRepository_.findOne({
            where: { id: id.toString(), user: { id: userId } },
        });
    } catch (error) {
        throw new Error("Error occuring while fetching todo");
    }
    if (todo) {
      const result = await this.todoRepository_.softDelete(id);
      return result;
    } else {
      throw new Error("Todo not found");
    }
  }
}
export default TodoService;