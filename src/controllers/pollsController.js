import connectMongoDB from "../../mongoConection.js";

const { banco_dados } = await connectMongoDB();


export async function cadastrarEnquete(req, res){
    const enquete = req.body;
    
    const inserirEnquetes = banco_dados.collection("enquetes").insertOne(enquete);
    inserirEnquetes.then((r) => {
        res.status(201).send("Enquete cadastrada com sucesso");
    })
    const buscarEnquetes =  banco_dados.collection("enquetes").find({}).toArray();
    buscarEnquetes.then((r) => {
        console.log(r);
    })
    res.send("OK_GET");
}

export function postPolls(req, res){
    res.send("OK_POST");
}