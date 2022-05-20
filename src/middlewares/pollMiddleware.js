import connectMongoDB from "../../mongoConection.js";
import { ObjectId } from "mongodb";

const { banco_dados } = await connectMongoDB();

export async function validarExpireAt(req, res, next){
    let expireAt = req.body.expireAt;
    next();
}

export async function solicitarEnquete(req, res, next){
    try {
        const enquete = await banco_dados.collection("enquetes").findOne({_id: ObjectId (req.params.id)});
        res.locals.enquete = {...enquete};
        next();
    }catch(error){
        res.send("Erro ao solicitar enquete")
    }
}