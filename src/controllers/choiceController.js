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
    let idOpcao = req.params.id;
    let voto = {"opcaoId": idOpcao , "registradoEm": "2022-05-19 00:00"};

    const novoVoto = banco_dados.collection("votos").insertOne({...voto});
    novoVoto.then(() => {
        res.status(200).send("Voto registrado com sucesso");
    });
   novoVoto.catch(() => {
       res.send("Erro ao registrar voto");
   });
}