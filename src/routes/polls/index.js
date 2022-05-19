//Configurações das rotas de poll
import { Router } from "express";
import { cadastrarEnquete, postPolls, solicitarEnquetes } from "../../controllers/pollsController.js";
import { validaExpireAt, validaTitulo } from "../../middlewares/pollMiddleware.js";

const pollsRouter = Router();

pollsRouter.post("/poll" , validaTitulo, validaExpireAt , cadastrarEnquete);
pollsRouter.get("/poll" , solicitarEnquetes);
pollsRouter.get("/poll/:id/choice" , postPolls);
pollsRouter.get("/poll/:id/result", postPolls);

export default pollsRouter;