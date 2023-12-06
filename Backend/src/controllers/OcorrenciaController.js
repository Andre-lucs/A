import OcorrenciaModel from '../models/Ocorrencia.js';

async function create({title, type, date, location, description}) {
    try {
        if(!title || !type || !date || !location || !description) 
            return {error: "Informe todos os dados necessários"};
      
        return await OcorrenciaModel.create({
            title,
            type,
            date,
            location,
            description,
    
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
        return ocorrencias;
    } catch (error) {
        throw new Error('Erro ao resgatar as ocorrências: '+ error.message);
    }
}

async function findById(id) {
    try{
        const ocorrencia = await OcorrenciaModel.findById({_id: id});
        if(!ocorrencia){
          return {error: "Ocorrência não encontrada!"}
        }
        return ocorrencia;
    } catch (error) {
        let err = new Error('Erro ao procurar a ocorrência: ' + error.message);
        err.status = error.status;
        throw err;
    }
}
async function update(id, {title, type, date, location, description}, returnObj = false) {
    try{
        if(!title || !type || !date || !location || !description)
            return {error: "Informe todos os dados necessários"};
        await OcorrenciaModel.updateOne({_id: id}, {
            title,
            type,
            date,
            location,
            description
        });
        if(returnObj){
            const ocorrencia = await OcorrenciaModel.findById(id);
            return ocorrencia;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
async function deleteById(id) {
    try{
        const deletedOcorrencia = await OcorrenciaModel.findByIdAndDelete(id);
        if(!deletedOcorrencia || !id)
            return {error: "Ocorrência não encontrada", resStatus: 404}
        if(deletedOcorrencia) {
            return {deleted: true};
        }
        return {error: "Não foi possível remover a ocorrência", resStatus: 400};
    } catch (error) {
       return {error: error.message, resStatus: 500};
    }
}

export {create, findAll, findById, update, deleteById, OcorrenciaModel};