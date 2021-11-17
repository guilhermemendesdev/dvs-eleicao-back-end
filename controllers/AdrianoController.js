const { idAlunos } = req.body

idAlunos.map(item => {
  const alunos = await Aluno.findOne({ _id: item }, '_id')
  alunos.deletado = true
  alunos.save()
})