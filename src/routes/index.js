import { Router } from "express";
import pollsRouter from "./polls/index.js";
import choiceRouter from "./choice/index.js";

const router = Router();

router.use(pollsRouter);
router.use(choiceRouter);

export default router;