const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const { cpf } = req.query;
        var isvalidate = function (data) {

            //var dir = "/var/www/html/pma-api/cred-saude/tmp/filesInscricoes" + "/" + cpf
            var dir = "./tmp/doc__eleicao/candidatos" + "/" + cpf
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                return dir;
            } else {
                return dir;
            }
        };

        callback(null, isvalidate())

    },
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jpg'),
    fileFilter: (req, file, cb) => {

        // Procurando o formato do arquivo em um array com formatos aceitos
        // A função vai testar se algum dos formatos aceitos do ARRAY é igual ao formato do arquivo.
        const isAccepted = ['image/jpg', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        // O formato do arquivo bateu com algum aceito?
        if (isAccepted) {
            // Executamos o callback com o segundo argumento true (validação aceita)
            return cb(null, true);
        }

        // Se o arquivo não bateu com nenhum aceito, executamos o callback com o segundo valor false (validação falhouo)
        return cb(null, false);
    }
});

const upload = multer({ storage })

module.exports = upload;