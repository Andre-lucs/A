import {DataTypes} from 'sequelize';
import sequelize from '../../database/SequelizeConnect.js';

import {OcorrenciaSchema} from '../mongoose/OcorrenciaSchema.js'
import mongoose from 'mongoose'

export const Ocorrencia = mongoose.model('Ocorrencia', OcorrenciaSchema)

export const OcorrenciaSQL = sequelize.define('ocorrencias', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    title : {
        type : DataTypes.STRING,
        field: "titulo"
    },
    type : {
        type : DataTypes.STRING,
        field: "tipo"
    },
    date : {
        type : DataTypes.DATE,
        field: "data_e_hora"
    },
    location : {
        type : DataTypes.GEOGRAPHY,
        field: "localizacao"
    },
    description :{
        type : DataTypes.STRING,
        field : "descricao"
    }
}, {
    timestamps: false
});


//Ocorrencia.sync();

