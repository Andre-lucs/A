import express from 'express';
import * as OcorrenciaController from '../controllers/OcorrenciaController.js'
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', async (req, res, next) => {
    try {
        const ocorrencias = await OcorrenciaController.findAll();
        console.log(ocorrencias)
        res.status(200).json(ocorrencias);
    } catch (error) {
        console.error(error);
        next(error);
    }
  });

router.get('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        const ocorrencia = await OcorrenciaController.findById(id);
        if(ocorrencia.error)
            return res.status(404).send({error: ocorrencia.error});
        return res.status(200).send(ocorrencia);
    }catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next)=>{
    try {
        let {title, type, date, location, description} = req.body;
        const modelLocation = (location.hasOwnProperty('lat') && location.hasOwnProperty('lng')) ? {
            type: 'Point',
            coordinates: [location.lng, location.lat]
        } : location;
        let ocorrencia = {title, type, date, location: modelLocation, description, userId: req.user}
        const novaOcorrencia = await OcorrenciaController.create(ocorrencia);
        console.log(novaOcorrencia)
        if(!novaOcorrencia.error)
            return res.status(201).json(novaOcorrencia);
        return res.status(400).send({err: ocorrencia.error});
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.delete('/:id', async (req, res, next)=>{
    try {
        const id = req.params.id;
        const {deleted} = await OcorrenciaController.deleteById(id);
        if(deleted)
            return res.status(200).send(deletedOccurence.message);
        return res.status(deletedOccurence.resStatus).send(deletedOccurence.error);
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
            coordinates: [location.lng, location.lat]
        }
        let ocorrencia = {title, type, date, location: modelLocation, description}
        const responseToSend = await OcorrenciaController.update(id, ocorrencia, returnObj);
        return res.status(200).send(responseToSend);
    } catch (error) {
        next(error);
    }
});

export default router;