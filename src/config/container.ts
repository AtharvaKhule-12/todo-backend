import { asClass, asValue, AwilixContainer } from 'awilix';
import { UserRepository } from '../repositories/user';
import { TodoRepository } from '../repositories/todo';
import UserService from '../services/userService';
import TodoService from '../services/todoService';

export function configureContainer(container: AwilixContainer) {
  container.register({
    userRepository_: asValue(UserRepository),
    todoRepository_: asValue(TodoRepository),
    UserService: asClass(UserService).singleton(),
    TodoService: asClass(TodoService).singleton(),
  });
}