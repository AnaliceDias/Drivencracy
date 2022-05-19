export async function validarTitulo(req, res, next){
    const titulo = req.body.title;
    
    if(titulo === ""){
        return res.status(422).send("O título não pode estar vazio");
    }
    next();
}