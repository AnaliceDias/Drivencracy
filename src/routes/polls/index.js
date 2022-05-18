//Configurações das rotas de poll
import { Router } from "express";
import { cadastrarEnquete, postPolls } from "../../controllers/pollsController.js";
import { validaExpireAt, validaTitulo } from "../../middlewares/pollMiddleware.js";

const pollsRouter = Router();

pollsRouter.get("/poll" , validaTitulo, validaExpireAt , cadastrarEnquete);
pollsRouter.post("/poll" , postPolls);
pollsRouter.get("/poll/:id/choice" , postPolls);
pollsRouter.get("/poll/:id/result", postPolls);

export default pollsRouter;