import connectMongoDB from "../../mongoConection.js";
import dayjs from "dayjs";

const { banco_dados } = await connectMongoDB();

export async function criarOpcaoDeVoto(req, res){
    const opcaoDeVoto = { ...req.body};
    
    try {
        await banco_dados.collection("opcoes_de_voto").insertOne(opcaoDeVoto);
        
        res.status(201).send(opcaoDeVoto);
    }catch(error){
        res.status(404).send("Erro ao tentar cadastrar nova opção de voto");
    }
}

export async function registrarVoto(req, res){
    let idOpcao = req.params.id;
    let horario = new Date(dayjs().format('YYYY-MM-DD HH:mm'));
    let voto = {"createdAt": horario , "choiceId": idOpcao};
    
    try {
        await banco_dados.collection("votos").insertOne({...voto});
        res.status(201).send("Voto registrado com sucesso");
    }catch(error){
        res.send("Erro ao registrar voto");
    }

}