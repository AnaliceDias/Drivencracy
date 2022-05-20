import connectMongoDB from "../../mongoConection.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

const { banco_dados } = await connectMongoDB();

export async function validarExpireAt(req, res, next){
    let expireAt = req.body.expireAt;
    let hoje = new Date(dayjs().format('YYYY-MM-DD HH:mm'));
    let maisTrintaDias = new Date();
    maisTrintaDias = dayjs(maisTrintaDias.setDate(hoje.getDate() + 30)).format('YYYY-MM-DD HH:mm');
    
    if(expireAt === ""){
        res.locals.expireAt = maisTrintaDias;
        console.log(res.locals.expireAt);
    }

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