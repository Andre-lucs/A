import { Schema } from "mongoose";


export const OcorrenciaSchema = new Schema({
    title: String,
    type: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: Date
    },
    description: {
      required: true,
      type: String
    },
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
    },
    userId: {
      type: String
    }
})
