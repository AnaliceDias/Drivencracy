import { Router } from "express";
import {criarOpcaoDeVoto, registrarVoto} from "../../controllers/choiceController.js";
import { validarExistenciaDaOpcao, validarTituloUnico } from "../../middlewares/choiceMiddleware.js";
import { validarTitulo, verificarExpiracaoDaEnquete } from "../../middlewares/middleware.js";

const choiceRouter = Router();

choiceRouter.post("/choice" , validarTitulo , verificarExpiracaoDaEnquete , validarTituloUnico ,criarOpcaoDeVoto);
choiceRouter.post("/choice/:id/vote", validarExistenciaDaOpcao, verificarExpiracaoDaEnquete , registrarVoto);

export default choiceRouter;