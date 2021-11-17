class AdrianoController {

  async addCandidato(req, res, next) {
    try {
      const { idAlunos } = req.body

      idAlunos.map(async item => { //tem que colocar async antes do item
        console.log(item) //verifica como ta recebendo o item, se é um ID válido
        const alunos = await Aluno.findOne({ _id: item }, '_id deletado')
        console.log(alunos) //verifica se esta recebendo algo e oque esta recebendo
        alunos.deletado = true
        await alunos.save()
        return res.send({ alunos });
      })
    } catch (e) {
      next(e);
    }
  }
}


//MANDEI OS DADOS NO INSOMNIA DA SEGUINTE FORMA :

// {	
// 	"idAlunos": [
// 		"6189232364260000b9005d02",
// 	"6189232364260000b9005d03"	]

// }