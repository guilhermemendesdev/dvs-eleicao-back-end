module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : "DA1W6D51AW86D4F86ER46D846SAE4D6846D46AW84D64D6A5D4WD65A1WD65WA1D",
    api: process.env.NODE_ENV === 'production' ? "http://api.loja-teste.ampliee.com" : 'http://localhost:3000',
    loja: process.env.NODE_ENV === 'production' ? "http://loja-teste.ampliee.com" : 'http://localhost:8000',
};