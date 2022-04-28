import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import User from '../../models/User'
import Materiel from '../../models/Materiel'

export default {
  User: {
    materiels: async (user) => {
      return await Materiel.find({ userId: user.id })
    }
  },

  Query: {
    users: async (_, args, context, info) => {
      return await User.find()
    },

    user: async (_, args, context, info) => {
      const isObjectIdOrHexString = mongoose.isValidObjectId(args.id)
      if (!isObjectIdOrHexString) {
        throw new UserInputError('Invalid input value')
      }

      const user = await User.findById(args.id)

      if (!user) {
        throw new UserInputError('Invalid input value')
      }

      return user
    }
  },

  Mutation: {
    addUser: async (_, { addUserFields }, context, info) => {
      return await User.create(addUserFields)
    },

    updateUser: async (_, { id, updateUserFields }, context, info) => {
      const isObjectIdOrHexString = mongoose.isValidObjectId(id)

      if (!isObjectIdOrHexString) {
        throw new UserInputError('Invalid input value')
      }

      const user = await User.findById(id)

      if (!user) {
        throw new UserInputError('Invalid input value')
      }

      return await User.findByIdAndUpdate(id, updateUserFields)
    },

    deleteUser: async (_, { id }, context, info) => {
      const isObjectIdOrHexString = mongoose.isValidObjectId(id)

      if (!isObjectIdOrHexString) {
        throw new UserInputError('Invalid input value')
      }

      const user = await User.findById(id)

      if (!user) {
        throw new UserInputError('Invalid input value')
      }

      await User.findByIdAndDelete(id)

      return user.id
    }
  }
}
