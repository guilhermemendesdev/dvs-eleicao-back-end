const { idAlunos } = req.body

idAlunos.map(async item => {
  const alunos = await Aluno.findOne({ _id: item }, '_id deletado')
  console.log(alunos) //verifica se esta recebendo algo e oque esta recebendo
  alunos.deletado = true
  await alunos.save()
})