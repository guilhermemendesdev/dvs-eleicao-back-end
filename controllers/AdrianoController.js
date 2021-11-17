const alunos = await Aluno.find({ serie: /9º/ }, '_id inep');

alunos.map(item => {
  item.votante = true
  item.save()
})