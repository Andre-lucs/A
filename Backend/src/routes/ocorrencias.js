import express from 'express';
import * as OcorrenciaService from '../services/OcorrenciaService.js'

const router = express.Router();

router.get('/', async (req, res)=>{
    const ocorrencias = await OcorrenciaService.findAll();
    res.json(ocorrencias);

})

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const ocorrencia = await OcorrenciaService.findById(id);
    res.send(ocorrencia);
});

router.post('/', async (req, res)=>{
    var ocorrencia = req.body;
    ocorrencia = await OcorrenciaService.create(ocorrencia);
    //salva no banco de dados
    res.json(ocorrencia);
});

router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    OcorrenciaService.deleteById(id);
    res.sendStatus(200);
});

router.put('/:id', async (req, res)=>{
    const id = req.params.id;
    const returnObj = req.query.returnObj  == 'true';
    const novaOcorrencia = req.body;
    const responseToSend = await OcorrenciaService.update(id, novaOcorrencia, returnObj);
    res.json(responseToSend);
});

export default router;