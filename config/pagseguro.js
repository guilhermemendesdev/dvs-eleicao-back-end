module.exports = {
    mode: process.env.NODE_ENV === "production" ? "live" : "sandbox",
    sandbox: process.env.NODE_ENV === "production" ? false : true,
    sandbox_email: process.env.NODE_ENV === "production" ? null : "c93180831567775072497@sandbox.pagseguro.com.br",
    email: "guilhermemendesdev@gmail.com",
    token: "4344190832984F23A2FF8BA55B05BA7A",
    notificationURL: "http://api.loja-teste.ampliee.com/v1/api/pagamentos/notificacao"
};