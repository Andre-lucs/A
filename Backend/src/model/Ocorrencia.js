// import {DataTypes} from 'sequelize';
// import sequelize from '../config.js';
const Ocorrencia = require('../schemas/OccurrenceSchema')
const mongoose = require('mongoose');

const OcorrenciaModel = mongoose.model('Ocorrencia', Ocorrencia)

// const Ocorrencia = sequelize.define('ocorrencias', {
//     id : {
//         type : DataTypes.INTEGER,
//         primaryKey : true,
//         autoIncrement: true
//     },
//     title : {
//         type : DataTypes.STRING,
//         field: "titulo"
//     },
//     type : {
//         type : DataTypes.STRING,
//         field: "tipo"
//     },
//     date : {
//         type : DataTypes.DATE,
//         field: "data_e_hora"
//     },
//     location : {
//         type : DataTypes.GEOGRAPHY,
//         field: "localizacao"
//     },
//     description :{
//         type : DataTypes.STRING,
//         field : "descricao"
//       }
// }, {
//     timestamps: false
// });


//Ocorrencia.sync();

module.exports = OcorrenciaModel;
