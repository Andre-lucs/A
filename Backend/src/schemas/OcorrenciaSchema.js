import { Schema } from "mongoose";


export const OcorrenciaSchema = new Schema({
    id: Number,
    title: String,
    type: String,
    date: Date,
    description: String,
    location: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }
})
