import {OcorrenciaSchema} from '../schema/OcorrenciaSchema.js'
import mongoose from 'mongoose'

export const Ocorrencia = mongoose.model('Ocorrencia', OcorrenciaSchema)

