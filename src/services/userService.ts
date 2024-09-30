import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { User } from "../entity/user";
import { UserRepository } from "../repositories/user";

declare module 'express-session' {
    interface Session {
      userId?: string;
    }
}

type UserServiceDependencies = {
    userRepository_: typeof UserRepository;
}

class UserService {
  private userRepository_: typeof UserRepository;

  constructor(
    {
      userRepository_
    }: UserServiceDependencies
  ) {
    this.userRepository_ = userRepository_;
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