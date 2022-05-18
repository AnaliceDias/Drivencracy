export async function validaTitulo(req, res, next){
    const titulo = req.body.title;
    
    if(titulo === ""){
        return res.status(422).send("O título da enquete não pode estar vazio");
    }
    next();
}

export async function validaExpireAt(req, res, next){
     
    let expireAt = "2021-05-01 00:05";
    // req.body.expireAt = expireAt;

    next();
}