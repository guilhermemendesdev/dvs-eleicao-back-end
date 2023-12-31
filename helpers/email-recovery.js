const transporter = require('nodemailer').createTransport(require('../config/email'));
const { api: link } = require('../config/index');

module.exports = ({ usuario, recovery }, cb) => {
    const message = `
    <h1 style="text-align: center;">Recuperação de Senha</h1>
    <br />
    <p>
        Aqui está o link para redefinir a sua senha. Acesse ele e digite sua nova senha:
    </p>
   <a href="${link}/api/v1/usuarios/senha-recuperada?token=${recovery.token}">
            ${link}/api/v1/usuarios/senha-recuperada?token=${recovery.token}
        </a>
    <br/><br/><hr/>
    <p>
        Obs.: Se você não solicitou a redefinição, apena ignore esse email.
    </p>
    <br />
    <p> Atenciosamente, Voluntários de coração</p>
    `;

    const opcoesEmail = {
        from: 'guilhermesousa@edu.anapolis.go.gov.br',
        to: usuario.email,
        subject: 'Redefinição de senha - Voluntário de coração',
        html: message
    };

    transporter.sendMail(opcoesEmail, (error, info) => {
        if (error) {
            console.log(error);
            return cb('Aconteceu um erro no envio do email, tente novamente.');
        } else {
            return cb(null, 'Link para redefinição de senha foi enviado com sucesso para seu email.')
        }
    });
}