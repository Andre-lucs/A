import {DataTypes} from 'sequelize';
import sequelize from '../config.js';

const Ocorrencia = sequelize.define('ocorrencias', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    titulo : {
        type : DataTypes.STRING
    },
    tipo : {
        type : DataTypes.STRING
    },
    data_e_hora : {
        type : DataTypes.DATE
    },
    localizacao : {
        type : DataTypes.GEOGRAPHY
    }
      
}, {
    timestamps: false
});


//Ocorrencia.sync();

export default Ocorrencia;
