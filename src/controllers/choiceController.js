import connectMongoDB from "../../mongoConection.js";

const { banco_dados } = await connectMongoDB();

export async function criarOpcaoDeVoto(req, res){
    const opcaoDeVoto = { ...req.body};
    
    const inserirOpcaoDeVoto =  banco_dados.collection("opcoes_de_voto").insertOne(opcaoDeVoto);
    inserirOpcaoDeVoto.then((r) => { 
        res.status(201).send(opcaoDeVoto);
    });
    inserirOpcaoDeVoto.catch((r) => {
        res.status(404).send("Erro ao tentar cadastrar nova opção de voto");
    });

}

export async function registrarVoto(req, res){
    res.status(200).send("Cheguei");
}