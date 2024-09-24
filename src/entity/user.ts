import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { Todo } from "./todo";
import { BaseEntity } from "./base";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, todo => todo.user)
  todos!: Todo[]; // List of Todo items for the user

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
