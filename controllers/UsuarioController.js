const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Candidatura = mongoose.model("Candidatura");
const Portifolio = mongoose.model("Portifolio");
const enviarEmailRecovery = require('../helpers/email-recovery');

class UsuarioController {

    //GET / 
    index(req, res, next) {
        Usuario.findById(req.payload.id).then(usuario => {
            if (!usuario) return res.status(401).json({ errors: 'Usuário não Registrado' })
            return res.json({ usuario: usuario.enviarAuthJSON() })
        }).catch(next);
    }

    async indexAdm(req, res, next) {
        try {
            const usuarios = await Usuario.paginate();
            return res.send({ usuarios });
        } catch (e) {
            next(e);
        }
    }

    //GET /:id
    show(req, res, next) {
        Usuario.findById(req.params.id).populate()
            .then(usuario => {
                if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
                return res.json({
                    usuario: {
                        nome: usuario.nome,
                        cpf: usuario.cpf,
                        foto: usuario.foto,
                        permissao: usuario.permissao
                    }
                });
            }).catch(next);
    }

    //POST /registrar
    store(req, res, next) {
        const { nome, cpf, email, password } = req.body;

        const usuario = new Usuario({ nome, cpf, email });
        usuario.setSenha(password);

        usuario.save()
            .then(() => res.json({ usuario: usuario.enviarAuthJSON() }))
            .catch((err) => {
                console.log(err);
                next(err);
            });
    }

    //PUT /
    update(req, res, next) {
        const { nome, cpf, password, email } = req.body;
        Usuario.findById(req.payload.id).then((usuario) => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            if (typeof nome !== "undefined") usuario.nome = nome;
            if (typeof cpf !== "undefined") usuario.cpf = cpf;
            if (typeof email !== "undefined") usuario.email = email;
            if (typeof password !== "undefined") usuario.setSenha(password);

            return usuario.save().then(() => {
                return res.json({ usuario: usuario.enviarAuthJSON() });
            }).catch(next);
        }).catch(next);
    }

    //PUT /images/:id
    async updateImagem(req, res, next) {
        try {
            const usuario = await Usuario.findOne({ _id: req.params.id });
            if (!usuario) return res.status(400).send({ error: "Usuário não encontrado." });

            const image = usuario.fotos;
            if (image) promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'usuario', image))

            const novasImagens = req.files.map(item => item.filename);
            usuarios.fotos = novasImagens;

            await usuarios.save();

            return res.send({ usuarios });
        } catch (e) {
            next(e);
        }
    }

    //DELETE /
    remove(req, res, next) {
        Usuario.findById(req.payload.id).then(usuario => {
            if (!usuario) return res.status(401).json({ errors: 'Usuario não registrado' });
            return usuario.remove().then(() => {
                return res.json({ deletado: true });
            }).catch(next);
        }).catch(next)
    }

    //GET /:search
    async search(req, res, next) {
        const search = new RegExp(req.params.search, 'i');
        try {
            const usuario = await Usuario.paginate(
                { cpf: { $regex: search } },
            );
            return res.send({ usuario })
        } catch (e) {
            next(e);
        }
    }

    async showCandidaturaVoluntario(req, res, next) {
        try {
            var candidaturas = await Candidatura.find({ voluntario: req.payload.id });

            candidaturas = await Promise.all(candidaturas.map(async (candidatura) => {
                candidatura.portifolio = await Portifolio.findById(candidatura.portifolio);
                return candidatura;
            }));
            return res.send({ candidaturas });
        } catch (e) {
            next(e);
        }
    }

    //POST /login
    login(req, res, next) {
        const { cpf, password } = req.body;
        Usuario.findOne({ cpf }).then((usuario) => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            if (!usuario.validarSenha(password)) return res.status(401).json({ errors: "Senha inválida" });
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }

    //RECOVERY
    //GET /recuperar-senha
    showRecovery(req, res, next) {
        return res.render('recovery', { error: null, success: null });
    }

    //POST /recuperar-senha
    createRecovery(req, res, next) {
        const { cpf } = req.body;
        if (!cpf) return res.render('recovery', { error: "Preencha com o seu CPF", success: null });

        Usuario.findOne({ cpf }).then((usuario) => {
            if (!usuario) return res.render('recovery', { error: 'Não existe usuário com este CPF', success: null });
            const recoveryData = usuario.criarTokenRecuperacaoSenha();
            return usuario.save().then(() => {
                enviarEmailRecovery({ usuario, recovery: recoveryData }, (error = null, success = null) => {
                    return res.render('recovery', { error, success });
                });
            }).catch(next);
        }).catch(next)
    }

    //GET / senha-recuperada
    showCompleteRecovery(req, res, next) {
        if (!req.query.token) return res.render("recovery", { error: "Token não identificado", success: null });
        Usuario.findOne({ "recovery.token": req.query.token }).then(usuario => {
            if (!usuario) return res.render("recovery", { error: "Não existe usuário com este token", success: null });
            if (new Date(usuario.recovery.date) < new Date()) return res.render("recovery", { error: "Token expirado. Tente novamente.", success: null });
            return res.render("recovery/store", { error: null, success: null, token: req.query.token });
        }).catch(next);
    }

    //POST /senha-recuperada
    completeRecovery(req, res, next) {
        const { token, password } = req.body;
        if (!token || !password) return res.render("recovery/store", { error: "Preencha novamente com sua nova senha", success: null, token: token });
        Usuario.findOne({ "recovery.token": token }).then(usuario => {
            if (!usuario) return res.render("recovery", { error: "Usuario nao identificado", success: null });

            usuario.finalizarTokenRecuperacaoSenha();
            usuario.setSenha(password);
            return usuario.save().then(() => {
                return res.render("recovery/store", {
                    error: null,
                    success: "Senha alterada com sucesso. Tente novamente fazer login.",
                    token: null
                });
            }).catch(next);
        });
    }
}

module.exports = UsuarioController