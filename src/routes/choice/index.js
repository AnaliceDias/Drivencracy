import { Router } from "express";
import {criarOpcaoDeVoto, registrarVoto} from "../../controllers/choiceController.js";
import { validarExistenciaDaOpcao, validarTituloUnico } from "../../middlewares/choiceMiddleware.js";
import { validarTitulo } from "../../middlewares/middleware.js";

const choiceRouter = Router();

choiceRouter.post("/choice" , validarTitulo , validarTituloUnico ,criarOpcaoDeVoto);
choiceRouter.post("/choice/:id/vote", validarExistenciaDaOpcao , registrarVoto);

export default choiceRouter;