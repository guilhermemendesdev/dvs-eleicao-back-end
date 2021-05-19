const transporter = require('nodemailer').createTransport(require('../config/email'));
const moment = require('moment');

const _send = ({ subject, emails, message }, cb = null) => {
  const mailOptions = {
    from: 'guilhermesousa@edu.anapolis.go.gov.br',
    to: emails,
    subject,
    html: message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.warn(error);
      if (cb) return cb(error);
    } else {
      if (cb) return cb(null, true);
    }
  });
};

//NOVO BOLETIM
const enviarNovoBoletim = (boletimAcidente, veiculoCondutor) => {
  const boletim = boletimAcidente.boletimAcidente
  const condutor = veiculoCondutor.veiculoCondutor
  const message = `
        <h1 style="text-align: center;"> Boletim Recebido </h1>
        <br/>
        <p> O boletim realizado hoje, no dia ${moment(boletim.createdAt).format("DD/MM/YYYY")}, foi recebido com sucesso</p>
        <br/>        
        <br/><br/>
        <p>Atenciosamento,</p>
        <p>Equipe CMTT</p>
        `;
  _send({
    subject: "Boletim Recebido - Equipe CMTT",
    emails: condutor.email,
    message
  })
}

module.exports = {
  enviarNovoBoletim,
}