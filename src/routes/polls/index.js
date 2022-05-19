//Configurações das rotas de poll
import { Router } from "express";
import { cadastrarEnquete, solicitarEnquetes, solicitarOpcoesDeVotos } from "../../controllers/pollsController.js";
import { validarExpireAt, validarTitulo } from "../../middlewares/pollMiddleware.js";

const pollsRouter = Router();

pollsRouter.post("/poll" , validarTitulo, validarExpireAt , cadastrarEnquete);
pollsRouter.get("/poll" , solicitarEnquetes);
pollsRouter.get("/poll/:id/choice" , solicitarOpcoesDeVotos);
pollsRouter.get("/poll/:id/result");

export default pollsRouter;