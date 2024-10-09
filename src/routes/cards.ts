import { Router } from "express";
import {
  getCards,
  getCardById,
  postCard,
  putLikesCard,
  deleteLikesCard,
} from "../controllers/cards";

const router = Router();

router.get("/cards", getCards);
router.get("/cards/:cardId", getCardById);
router.post("/cards", postCard);
router.put("/cards/:cardId/likes", putLikesCard);
router.delete("/cards/:cardId/likes", deleteLikesCard);

export default router;
