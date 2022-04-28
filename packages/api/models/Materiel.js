import { Schema, model } from 'mongoose'

const materielSchema = new Schema(
  {
    serie: {
      type: String,
      trim: true,
      required: true
    },
    detailId: {
      type: String,
      trim: true,
      required: true
    },
    userId: {
      type: String,
      default: null
    },
    technicienId: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['en marche', 'en panne'],
      default: 'en marche'
    }
  },
  {
    timestamps: true
  }
)

const materielModel = model('materielModel', materielSchema, 'materiel')

export default materielModel
