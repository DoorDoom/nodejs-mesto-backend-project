import { Router } from "express";
import {
  getUsers,
  getUserById,
  postUser,
  patchMe,
  patchMyAvatar,
} from "../controllers/users";

const router = Router();
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.post("/users", postUser);
router.patch("/users/me", patchMe);
router.patch("/users/me/avatar", patchMyAvatar);

export default router;
