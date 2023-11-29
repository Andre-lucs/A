import {createClient} from 'redis';
import 'dotenv/config'

export const redisClient = createClient({
    password: process.env.REDIS_DATABASE_PASSWORD,
    socket: {
        host: process.env.REDIS_DATABASE_HOST,
        port: process.env.REDIS_DATABASE_PORT
    }
});


export async function connectRedis () {
    await redisClient.connect();
    redisClient.on('error', err => {
        console.log('Erro: ' + err);
    })
    console.log('Conectado com os redis')
}


