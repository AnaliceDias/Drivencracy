import { Router } from "express";
import {criarOpcaoDeVoto} from "../../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice" , criarOpcaoDeVoto);

export default choiceRouter;