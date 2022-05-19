import connectMongoDB from "../../mongoConection.js";

const { banco_dados } = await connectMongoDB();


export async function cadastrarEnquete(req, res){
    const enquete = { ...req.body};
    //enquete.expireAt = res.locals.expireAt;
        
    const inserirEnquetes = banco_dados.collection("enquetes").insertOne(enquete);
    inserirEnquetes.then((r) => { 
        res.status(201).send("Enquete cadastrada com sucesso");
    });
    inserirEnquetes.catch((r) => {
        res.status(404).send("Erro ao tentar cadastrar sua enquete");
    });
}

export async function solicitarEnquetes(req, res){
    const pesquisarEnquetes = banco_dados.collection("enquetes").find({}).toArray();

    pesquisarEnquetes.then((r) => {
        res.send(r);
    });
    pesquisarEnquetes.catch((r) => {
        res.send("Erro ao solicitar enquetes.")
    })
}

export async function postPolls(req, res){
    res.send("OK_POST");
}