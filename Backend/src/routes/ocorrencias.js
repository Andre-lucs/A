import express from 'express';
import * as OcorrenciaService from '../services/OcorrenciaService.js'

const router = express.Router();

router.get('/', async (req, res, next)=>{
    try{
        const ocorrencias = await OcorrenciaService.findAll();
        res.json(ocorrencias);
    }catch(error){
        next(error);
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        const ocorrencia = await OcorrenciaService.findById(id);
        res.send(ocorrencia);
    }catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next)=>{
    try {
        var ocorrencia = req.body;
        ocorrencia = await OcorrenciaService.create(ocorrencia);
        res.json(ocorrencia);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next)=>{
    try {
        const id = req.params.id;
        OcorrenciaService.deleteById(id);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next)=>{
    try {
        const id = req.params.id;
        const returnObj = req.query.returnObj  == 'true';
        const novaOcorrencia = req.body;
        const responseToSend = await OcorrenciaService.update(id, novaOcorrencia, returnObj);
        res.json(responseToSend);
    } catch (error) {
        next(error);
    }
});

export default router;