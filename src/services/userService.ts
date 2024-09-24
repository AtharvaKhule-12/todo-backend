import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { UserRepository } from "../repositories/user";

declare module 'express-session' {
    interface Session {
      userId?: string;
    }
}

type InjectedDependencies = {
  userRepository: typeof UserRepository;
};

class UserService {
  private readonly userRepository_: typeof UserRepository;

  constructor({userRepository}: InjectedDependencies) {
    this.userRepository_ = userRepository;
  }

  async register(email: string, password: string): Promise<{ message: string }> {
    const user = new User();
    user.email = email;
    await user.setPassword(password);
    await this.userRepository_.save(user);
    return { message: "User registered" };
  }

  async login(email: string, password: string): Promise<{ message: string, userId?: string }> {
    const user = await this.userRepository_.findOneBy({ email });

    if (!user || !(await user.checkPassword(password))) {
      return { message: "Invalid credentials" };
    }

    return { message: "Login successful", userId: user.id };
  }

  logout(req: Request, res: Response) {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  }
};

export default UserService;