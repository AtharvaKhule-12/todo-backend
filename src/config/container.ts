import { DependencyContainer } from "tsyringe";
import { UserRepository } from "../repositories/user";
import { TodoRepository } from "../repositories/todo";
import UserService from "../services/userService";
import TodoService from "../services/todoService";

export function configureContainer(container: DependencyContainer): void {
  container.registerInstance("UserRepository", UserRepository);
  container.registerInstance("TodoRepository", TodoRepository);
  container.registerInstance("UserService", UserService);
  container.registerInstance("TodoService", TodoService);
}