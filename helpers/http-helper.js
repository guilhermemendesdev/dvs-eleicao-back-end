const badRequest = (error) => ({
  statusCode: 400,
  body: error
})

const ok = (data) => ({
  statusCode: 200,
  body: data
})

module.exports = {
  badRequest,
  ok
}
