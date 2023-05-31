//RYK AUTH I EGEN FIL (done) husk at implementere i get metode.

const user = (req, res, next) => {
    if(!req.session.user){
        return res.status(400).send({data: "user is not logged in"});
    };
    next();
};

const admin = (req, res, next) => {
    if (req.session.user && req.session.privilege !== "admin"){
        return res.status(403).send({data: "restricted resource"})
    };
    next();
}

export { user, admin };