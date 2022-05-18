import { Router } from "express";
import {getChoice, postChoice} from "../../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice" , postChoice);
choiceRouter.get("/choice/:id/vote" , getChoice); 

export default choiceRouter;