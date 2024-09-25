import express from "express";
import session from "express-session";
import cors from "cors";
import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "./repositories/user";
import { TodoRepository } from "./repositories/todo";
import UserService from "./services/userService";
import TodoService from "./services/todoService";
import { userRoutes } from "./routes/userRoutes/index";
import { todoRoutes } from "./routes/todoRoutes/index";

const app = express();
app.use(express.json());

// Configure express-session
app.use(
  session({
    secret: "randomndjssj2412",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

// Enable CORS
app.use(cors({
  origin: "http://localhost:3001", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
}));

// Register dependencies
container.registerInstance("UserRepository", UserRepository);
container.registerInstance("TodoRepository", TodoRepository);
container.registerSingleton(UserService);
container.registerSingleton(TodoService);

// Use routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});