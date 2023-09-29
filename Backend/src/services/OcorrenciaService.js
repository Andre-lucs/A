import Ocorrencia from "../model/Ocorrencia.js";

async function create({titulo, tipo, data_e_hora, localizacao}) {
    try {
        const novaOcorrencia = await Ocorrencia.create({
        titulo,
        tipo,
        data_e_hora,
        localizacao,
        });
        return novaOcorrencia;
    } catch (error) {
        throw new Error('Erro ao criar a ocorrência: ' + error.message);
    }
}
async function findAll(){
    try{
        const ocorrencias = await Ocorrencia.findAll();
        return ocorrencias;
    } catch (error) {
        throw new Error('Erro ao resgatar as ocorrências: '+ error.message);
    }
}
async function findById(id) {
    try{
        const ocorrencia = await Ocorrencia.findByPk(id);
        return ocorrencia;
    } catch (error) {
        throw new Error('Erro ao procurar a ocorrência: ' + error.message);
    }
}
async function update(id, novosDados, returnObj = false) {
    try{
        var modified = await Ocorrencia.update(novosDados, {
            where : {
                id : id
            }
        });
        if(returnObj){
            const ocorrencia = await Ocorrencia.findByPk(id);
            return ocorrencia;
        }
        return modified[0];
    } catch (error) {
        throw new Error(error.message);
    }
}
async function deleteById(id) {
    try{
        await Ocorrencia.destroy({
            where : {
                id : id
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export {create, findAll, findById, update, deleteById};