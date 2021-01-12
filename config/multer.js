const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, __dirname + '/../public/doc__inscricao'),
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jpg')
});

const upload = multer({ storage })

//IMAGENS PORTIFÓLIO
const storagePortifolio = multer.diskStorage({
    destination: (req, file, callback) => callback(null, __dirname + '/../public/portifolio'),
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jpg')
});

const uploadPortifolio = multer({
    fileFilter: function (req, file, callback) {
        if (path.extname(file.originalname) !== '.jpeg' && path.extname(file.originalname) !== '.jpg' && path.extname(file.originalname) !== '.png') {
            return callback(new Error('Extensão de arquivo não suportada'));
        }
        callback(null, true)
    },
    storage: storagePortifolio,
    limits: { fileSize: 2 * 1024 * 1024 }
})

//IMAGENS USUÁRIO
const storageUsuario = multer.diskStorage({
    destination: (req, file, callback) => callback(null, __dirname + '/../public/usuario'),
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jpg')
});

const uploadUsuario = multer({
    fileFilter: function (req, file, callback) {
        if (path.extname(file.originalname) !== '.jpeg' && path.extname(file.originalname) !== '.jpg' && path.extname(file.originalname) !== '.png') {
            return callback(new Error('Extensão de arquivo não suportada'));
        }
        callback(null, true)
    },
    storage: storageUsuario,
    limits: { fileSize: 2 * 1024 * 1024 }
})

module.exports = {
    upload,
    uploadPortifolio,
    uploadUsuario
}