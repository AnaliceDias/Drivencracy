import connectMongoDB from "../../mongoConection.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

const { banco_dados } = await connectMongoDB();

export async function validarTitulo(req, res, next){
    const titulo = req.body.title;
    res.locals.paraverificarExpiracao = req.body.pollId;
    
    if(titulo === ""){
        return res.status(422).send("O título não pode estar vazio");
    }
    next();
}

export async function verificarExpiracaoDaEnquete(req, res, next){
    let validade = "";

    try{
        const enquete = await banco_dados.collection("enquetes").findOne({_id: ObjectId (res.locals.paraverificarExpiracao)});
        validade = enquete.expireAt;
        
        if(!(dayjs().isBefore(validade))){
            res.status(403).send("Essa enquete já expirou");
        }else{
            next();
        }
                   
    }catch(error){
        res.send("Enquete não encontrada");
    }
}