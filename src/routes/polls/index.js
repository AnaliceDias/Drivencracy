//Configurações das rotas de poll
import { Router } from "express";
import { getPolls, postPolls } from "../../controllers/pollsController.js";

const pollsRouter = Router();

pollsRouter.get("/poll" , getPolls);
pollsRouter.post("/poll" , postPolls)
pollsRouter.get("/poll/:id/choice" ,getPolls);
pollsRouter.get("/poll/:id/result", getPolls);

export default pollsRouter;