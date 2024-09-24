import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

export const UserRepository = AppDataSource.getRepository(User);