import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let cachedDB;
let banco_dados;

const mongoClient = new MongoClient(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default async function connectMongoDB() {
    if (cachedDB) {
      return { db: cachedDB, mongoClient };
    }
 
    await mongoClient.connect();

    banco_dados = mongoClient.db(process.env.BANCO_DADOS);
    cachedDB = banco_dados;

  return { banco_dados, mongoClient };
}