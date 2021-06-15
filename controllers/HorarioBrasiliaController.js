const mongoose = require('mongoose');
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const EmailController = require('./EmailController');

class CandidatoController {

  /**
    *
    * ADM
    *
    */


  async index(req, res, next) {
    const hora = new Date
    const dataAtual = moment(hora).format('DD/MM/YYYY HH:mm:ss')
    return res.send({ dataAtual });

  }

}

module.exports = CandidatoController