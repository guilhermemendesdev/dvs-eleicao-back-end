const router = require('express').Router();


router.use('/usuarios', require('./usuarios'));
router.use('/clientes', require('./clientes'));
router.use('/categorias', require('./categorias'));
router.use('/lojas', require('./lojas'));
router.use('/produtos', require('./produtos'));
router.use('/avaliacoes', require('./avaliacoes'));
router.use('/variacoes', require('./variacoes'));
router.use('/inscricoes', require('./inscricoes'));
router.use('/formacoes', require('./formacoes'));
router.use('/cursos', require('./cursos'));
router.use('/unidades-publicas', require('./unidades-publicas'));
router.use('/portifolio', require('./portifolio'));
router.use('/candidaturas', require('./candidaturas'));

module.exports = router;