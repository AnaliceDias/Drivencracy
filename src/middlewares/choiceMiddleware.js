import connectMongoDB from "../../mongoConection.js";
import { ObjectID } from "bson";

const { banco_dados } = await connectMongoDB();

export async function validarTituloUnico(req, res, next){
    const titulo = req.body.title;
    let idEnquete = req.body.pollId;
    let todasOpcoesDeVoto = [];
    let opcoesDeVotoDaEnquete = [];

    const opcoesDeVoto = banco_dados.collection("opcoes_de_voto").find({}).toArray();

    opcoesDeVoto.then((r) => {
        todasOpcoesDeVoto = [...r];

        todasOpcoesDeVoto.map((opcao) => {
            if(opcao.pollId === idEnquete){
                opcoesDeVotoDaEnquete.push({...opcao});
            }
        });

        opcoesDeVotoDaEnquete.map((opcao) => {
            if(titulo === opcao.title){
                res.status(409).send("O título da opção de voto submetida já existe")
            }
        });
    });
    opcoesDeVoto.catch((r) => {
        res.send("Erro ao tentar cadastrar nova opção de voto");
    });

    next();
}

export async function validarExistenciaDaOpcao(req, res, next){
    let idOpcao = req.params.id;
        
    const opcaoDeVoto = banco_dados.collection("opcoes_de_voto").findOne({_id: ObjectID (idOpcao)});
    opcaoDeVoto.then(() => {
        //chamar função que verifica se enquete já expirou
        next();
    });
    opcaoDeVoto.catch(() => {
        res.status(404).send("Erro ao registrar voto");
    });

}