import express from 'express';
import * as OcorrenciaController from '../controllers/OcorrenciaController.js'
import { redisClient } from '../database/RedisConnect.js';

const router = express.Router();

router.get('/', async (req, res, next)=>{
    try{
        const ocorrenciasFromRedis = await redisClient.get('ocorrencias');
        if(ocorrenciasFromRedis){
            return res.status(200).json(JSON.parse(ocorrenciasFromRedis));
        }
        const ocorrencias = await OcorrenciaController.findAll();
        await redisClient.setEx('ocorrencias', 100, JSON.stringify(ocorrencias));
        return res.json(ocorrencias);
    }catch(error){
        next(error);
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        console.log(id);
        const ocorrenciaFromRedis = await redisClient.get(id);
        console.log(ocorrenciaFromRedis)
        if(ocorrenciaFromRedis){
            console.log('pegou do cache')
            return res.status(200).send(JSON.parse(ocorrenciaFromRedis));
        }
        const ocorrencia = await OcorrenciaController.findById(id);
        await redisClient.setEx(String(id), 200, JSON.stringify(ocorrencia));
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
        let ocorrencia = {title, type, date, location: modelLocation, description}
        const novaOcorrencia = await OcorrenciaController.create(ocorrencia);
        console.log(novaOcorrencia);
        await redisClient.setEx(String(novaOcorrencia._id), 200, JSON.stringify(novaOcorrencia));
        return res.status(201).json(novaOcorrencia);
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