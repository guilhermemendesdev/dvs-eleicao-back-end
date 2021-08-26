module.exports = class MissingParamError extends Error {
  constructor(paramName) {
    super(`${paramName} já votou!`)
  }
}