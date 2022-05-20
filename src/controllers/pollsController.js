import connectMongoDB from "../../mongoConection.js";

const { banco_dados } = await connectMongoDB();

export async function cadastrarEnquete(req, res){
    const enquete = { ...req.body};
        
    const inserirEnquetes =  banco_dados.collection("enquetes").insertOne(enquete);
    inserirEnquetes.then((r) => { 
        res.status(201).send("Enquete cadastrada com sucesso");
    });
    inserirEnquetes.catch((r) => {
        res.status(404).send("Erro ao tentar cadastrar sua enquete");
    });
}

export async function solicitarEnquetes(req, res){
    const pesquisarEnquetes =  banco_dados.collection("enquetes").find({}).toArray();
    

    pesquisarEnquetes.then((r) => {
        res.send(r);
    });
    pesquisarEnquetes.catch((r) => {
        res.send("Erro ao solicitar enquetes.")
    })
}

export async function solicitarOpcoesDeVotos(req, res){
    let idEnquete = req.params.id;
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
        res.send(opcoesDeVotoDaEnquete);
    });
    opcoesDeVoto.catch((r) => {
        res.send("Erro ao solicitar opções de voto");
    })
}

export async function verificarResultado(req, res){
    let idEnquete = req.params.id;
    let todasOpcoesDeVoto = [];
    let contagemDeVotos = [];
    let todosOsVotos = [];
    let opcaoMaisVotada = {
        ...res.locals.enquete,
        result: {
            title: "",
            votes: 0
        }
    };

    const opcoesDeVoto = banco_dados.collection("opcoes_de_voto").find({}).toArray();

    opcoesDeVoto.then((r) => {
        todasOpcoesDeVoto = [...r];
        
        todasOpcoesDeVoto.map((opcao) => {
            if(opcao.pollId === idEnquete){
                contagemDeVotos.push({opcao: opcao._id, tituloOpcao: opcao.title, votos: 0});
            }
        });

        if(contagemDeVotos.length === 0){
            res.send("Essa enquete ainda não recebeu votos");
        }
    });
    opcoesDeVoto.catch((r) => {
        res.send("Erro ao solicitar opções de voto");
    });

    const votosRecebidos = banco_dados.collection("votos").find({}).toArray();
    votosRecebidos.then((r) => {
        todosOsVotos = [...r];
        todosOsVotos.map((voto) => {
            for(let i =0; i < contagemDeVotos.length; i++){
                
                if(voto.choiceId === contagemDeVotos[i].opcao.toString()){
                    contagemDeVotos[i].votos += 1;
                }
            }
        })

        opcaoMaisVotada.result.title = contagemDeVotos[0].tituloOpcao;
        opcaoMaisVotada.result.votes = contagemDeVotos[0].votos;
        
        for(let i = 0; i< contagemDeVotos.length; i++){
            if(contagemDeVotos[i].votos > opcaoMaisVotada.result.votes){
                opcaoMaisVotada.result.title = contagemDeVotos[i].tituloOpcao;
                opcaoMaisVotada.result.votes = contagemDeVotos[i].votos;
            }
        }
        res.send(opcaoMaisVotada);
    });
    votosRecebidos.catch(() => {
        res.send("Erro ao solicitar votos");
    });    
}