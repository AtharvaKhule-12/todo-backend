import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne } from "typeorm";
import { User } from "./user";
import { BaseEntity } from "./base";

@Entity()
export class Todo extends BaseEntity {

  @Column()
  title!: string;

  @Column({ default: false })
  completed!: boolean;

  @ManyToOne(() => User, user => user.todos)
  user!: User; // Reference to the User entity
}
