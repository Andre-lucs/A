import {Ocorrencia} from '../models/Ocorrencia.js';

async function create({title, type, date, location, description}) {
    try {
        if(!title || !type || !date || !location || !description) 
            return {error: "Informe todos os dados necessários"};
        const novaOcorrencia = new Ocorrencia({
            title,
            type,
            date,
            location,
            description
        })
        await novaOcorrencia.save()
        return novaOcorrencia;
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
        const ocorrencias = await Ocorrencia.find();
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
        const ocorrencia = await Ocorrencia.findById({_id: id});
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
            const ocorrencia = await Ocorrencia.findByPk(id);
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
        if(!id)
            return {error: "Ocorrência não encontrada", resStatus: 404}
        const deletedOccurrence = await Ocorrencia.deleteOne({_id: id});
        if(deletedOccurrence)
            return deletedOccurrence;
        return {error: "Não foi possível remover a ocorrência", resStatus: 400};
    } catch (error) {
        throw new Error(error.message);
    }
}

export {create, findAll, findById, update, deleteById};