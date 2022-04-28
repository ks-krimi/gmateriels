import Detail from '../../models/Detail'
import Materiel from '../../models/Materiel'
import User from '../../models/User'
import Technicien from '../../models/Technicien'
import attemptExistingDoc from '../../utils/attemptExistingDoc'

export default {
  AllowedStatus: {
    EN_MARCHE: 'en marche',
    EN_PANNE: 'en panne'
  },

  Detail: {
    materiels: async (detail) => {
      return await Materiel.find({ detailId: detail.id })
    }
  },

  Materiel: {
    detail: async (materiel) => {
      return await Detail.findById(materiel.detailId)
    },
    user: async (materiel) => {
      return await User.findById(materiel.userId)
    },
    technicien: async (technicien) => {
      return await Technicien.findById(technicien.technicienId)
    }
  },

  Query: {
    materiels: async (root, args, context, info) => {
      return await Materiel.find()
    },

    materiel: async (root, { id }, context, info) => {
      return await attemptExistingDoc(Materiel, id, true)
    },

    details: async (root, args, context, info) => {
      return await Detail.find()
    },

    detail: async (root, { id }, context, info) => {
      return await attemptExistingDoc(Detail, id, true)
    }
  },

  Mutation: {
    addDetail: async (_, { addDetailFields }, context, info) => {
      return await Detail.create(addDetailFields)
    },
    updateDetail: async (_, { id, updateMaterielFields }, context, info) => {
      await attemptExistingDoc(Detail, id)
      const detail = await Detail.findByIdAndUpdate(id, updateMaterielFields)
      return detail
    },
    deleteDetail: async (_, { id }, context, info) => {
      await attemptExistingDoc(Detail, id)
      const detail = await Detail.findByIdAndDelete(id)
      return detail.id
    },

    addMateriel: async (_, { addMaterielFields }, context, info) => {
      const { detailId, userId, technicienId } = addMaterielFields
      if (detailId) await attemptExistingDoc(Detail, detailId)
      if (userId) await attemptExistingDoc(User, userId)
      if (technicienId) await attemptExistingDoc(Technicien, technicienId)
      return await Materiel.create(addMaterielFields)
    },
    updateMateriel: async (_, { id, updateMaterielFields }, context, info) => {
      await attemptExistingDoc(Materiel, id)
      return await Materiel.findByIdAndUpdate(id, updateMaterielFields)
    },
    deleteMateriel: async (_, { id }, context, info) => {
      await attemptExistingDoc(Materiel, id)
      const materiel = await Materiel.findByIdAndDelete(id)
      return materiel.id
    }
  }
}
