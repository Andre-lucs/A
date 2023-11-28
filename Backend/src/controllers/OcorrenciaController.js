import OcorrenciaModel from '../models/Ocorrencia.js';
import { ObjectId } from 'mongoose';

async function create({title, type, date, location, description, userId}) {
    try {
        if(!title || !type || !date || !location || !description || !userId) 
            return {error: "Informe todos os dados necessários"};
      
        return await OcorrenciaModel.create({
            title,
            type,
            date,
            location,
            description,
            userId
        });
    } catch (error) {
        let err = new Error('Erro ao criar a ocorrência: ' + error.message);
        if(error.message.includes("violates not-null constraint")){
            err.status = 400;
        }
        throw err;
    }
}

async function findAll(){
    try{
        const ocorrencias = await OcorrenciaModel.find();
        if(!ocorrencias)
            return [];
        const usefulData = ocorrencias.map(({title, type, date, id}) => {
            return {title, type, date, id}
        })
        return usefulData;
    } catch (error) {
        throw new Error('Erro ao resgatar as ocorrências: '+ error.message);
    }
}

async function findById(id) {
    try{
        const ocorrencia = await OcorrenciaModel.findById({_id: id});
        if(!ocorrencia){
            var err =new Error('Ocorrência não encontrada');
            err.status = 404;
            throw err;
        }
        return ocorrencia;
    } catch (error) {
        let err = new Error('Erro ao procurar a ocorrência: ' + error.message);
        err.status = error.status;
        throw err;
    }
}
async function update(id, {title, type, date, location, description} ,returnObj = false) {
    try{
        if(!title || !type || !date || !location || !description)
            return {error: "Informe todos os dados necessários"};
        await Ocorrencia.updateOne({_id: id}, novosDados);
        if(returnObj){
            const ocorrencia = await OcorrenciaModel.findByPk(id);
            return ocorrencia;
        }
        const upOccurence = await Ocorrencia.findById({_id: id});
        return upOccurence;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function deleteById(id) {
    try{
        if(await Ocorrencia.findById(id, "_id") != id)
            return {error: "Ocorrência não encontrada", resStatus: 404}
        const deletedOccurrence = await OcorrenciaModel.deleteOne({_id: id});
        if(deletedOccurrence.deletedCount > 0)
            return {message: "Ocorrência excluída com sucesso!"};
        return {error: "Não foi possível remover a ocorrência", resStatus: 400};
    } catch (error) {
       console.log(error)
    }
}

export default {create, findAll, findById, update, deleteById, OcorrenciaModel};