const mongoose = require("mongoose");
const Zona = mongoose.model("Zona");

const AdmValidation = {
    adm: (req, res, next) => {
        if (!req.payload.id) return res.sendStatus(401);
        Zona.findById(req.payload.id).then(zona => {
            if (!zona) return res.sendStatus(401);
            if (!zona.role.includes("super-adm")) return res.sendStatus(401);
            next();
        }).catch(next);
    },
};

module.exports = { AdmValidation };