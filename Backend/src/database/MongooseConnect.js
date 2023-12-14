import mongoose from "mongoose";
import 'dotenv/config'

export default async function tryConnectMongoDB() {
  await mongoose.connect(process.env.MONGO_TEST_DATABASE_URL);
  console.log('Mongo conectado com sucesso!')
}