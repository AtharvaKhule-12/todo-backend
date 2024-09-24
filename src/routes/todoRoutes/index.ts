import express from "express";
import { Request, Response } from 'express';
import { authMiddleware } from "../../middleware/authMiddleware";
import getAllTodos from "./get-all-todos";
import createTodo from "./create-todo";
import updateTodo from "./update-todo";
import deleteTodo from "./delete-todo";
const router = express.Router();

router.get("/", authMiddleware, getAllTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export const todoRoutes = router;