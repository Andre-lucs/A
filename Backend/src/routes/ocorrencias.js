import express from 'express';
import * as OcorrenciaController from '../controllers/OcorrenciaController.js'

const router = express.Router();

router.get('/', async (req, res, next)=>{
    try{
        const ocorrencias = await OcorrenciaController.findAll();
        res.json(ocorrencias);
    }catch(error){
        next(error);
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        const ocorrencia = await OcorrenciaController.findById(id);
        res.send(ocorrencia);
    }catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next)=>{
    try {
        let {title, type, date, location, description} = req.body;
        const modelLocation = {
            type: 'Point',
            coordinates: [location.lat, location.lng]
        }
        let ocorrencia = {title, type, date, location: modelLocation, description}
        const novaOcorrencia = await OcorrenciaController.create(ocorrencia);
        res.status(201).json(novaOcorrencia);
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.delete('/:id', async (req, res, next)=>{
    try {
        const id = req.params.id;
        OcorrenciaController.deleteById(id);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next)=>{
    try {
        const id = req.params.id;
        const returnObj = req.query.returnObj  == 'true';
        let {title, type, date, location, description} = req.body;
        const modelLocation = {
            type: 'Point',
            coordinates: [location.lat, location.lng]
        }
        let ocorrencia = {title, type, date, location: modelLocation, description}
        const responseToSend = await OcorrenciaController.update(id, ocorrencia, returnObj);
        res.json(responseToSend);
    } catch (error) {
        next(error);
    }
});

export default router;