import connectMongoDB from "../../mongoConection.js";
import dotenv from "dotenv";

dotenv.config();

const { banco_dados } = await connectMongoDB();


    
// enquetes.then((r) => {
//     console.log(`Sou uma resposta: ${r}`);
// })

export async function getPolls(req, res){
    const enquetes =  banco_dados.collection("enquetes").find({}).toArray();
    enquetes.then((r) => {
        console.log(r);
    })
    res.send("OK_GET");
}

export function postPolls(req, res){
    res.send("OK_POST");
}