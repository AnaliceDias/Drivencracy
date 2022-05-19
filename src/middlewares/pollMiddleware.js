export async function validarTitulo(req, res, next){
    const titulo = req.body.title;
    
    if(titulo === ""){
        return res.status(422).send("O título da enquete não pode estar vazio");
    }
    next();
}

export async function validarExpireAt(req, res, next){
    let expireAt = req.body.expireAt;
    next();
}