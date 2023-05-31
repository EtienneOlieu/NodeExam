//RYK AUTH I EGEN FIL (done) husk at implementere i get metode.

function admin (req, res, next){
    if (req.session.privilege !== "admin"){
        return res.status(403).send({data: "restricted resource"})
    };
    next();
};