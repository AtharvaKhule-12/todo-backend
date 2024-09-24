import express from "express";
import register from "./register";
import login from "./login";
import logout from "./logout";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export const userRoutes = router;