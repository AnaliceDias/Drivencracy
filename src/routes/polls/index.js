//Configurações das rotas de poll
import { Router } from "express";
import { cadastrarEnquete, solicitarEnquetes, solicitarOpcoesDeVotos, verificarResultado } from "../../controllers/pollsController.js";
import { validarTitulo } from "../../middlewares/middleware.js";
import { solicitarEnquete, validarExpireAt } from "../../middlewares/pollMiddleware.js";

const pollsRouter = Router();

pollsRouter.post("/poll" , validarTitulo, validarExpireAt , cadastrarEnquete);
pollsRouter.get("/poll" , solicitarEnquetes);
pollsRouter.get("/poll/:id/choice" , solicitarOpcoesDeVotos);
pollsRouter.get("/poll/:id/result" , solicitarEnquete, verificarResultado);

export default pollsRouter;