import { Schema, model } from 'mongoose'

const technicienSchema = new Schema(
  {
    nom: {
      type: String,
      trim: true,
      required: true
    },
    prenom: {
      type: String,
      trim: true,
      required: true
    },
    contact: {
      type: String,
      trim: true,
      required: false
    }
  },
  {
    timestamps: true
  }
)

const technicienModel = model('Technicien', technicienSchema, 'techniciens')

export default technicienModel
