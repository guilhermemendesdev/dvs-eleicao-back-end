module.exports = {
    secret: "DA1W6D51AW86D4F86ER46D846SAE4D6846D46AW84D64D6A5D4WD65A1WD65WA1D",
    api: process.env.NODE_ENV === 'production' ? "http://api.anapolis.go.gov.br/apieleicao" : 'http://localhost:3000',
};