import app from "./src/app/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORTA = process.env.PORTA;


app.listen(PORTA , () => {
    console.log("Servidor no ar: http://localhost:5000");
});