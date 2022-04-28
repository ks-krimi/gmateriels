import { UserInputError } from 'apollo-server-core'
import mongoose from 'mongoose'

const attemptExistingDoc = async (
  Schema,
  id,
  wannaReturnDocIfFound = false
) => {
  const isObjectIdOrHexString = mongoose.isValidObjectId(id)
  if (!isObjectIdOrHexString) {
    throw new UserInputError('Invalid input value')
  }

  const doc = await Schema.findById(id)

  if (!doc) {
    throw new UserInputError('Invalid input value')
  }

  if (wannaReturnDocIfFound) {
    return doc
  }
}

export default attemptExistingDoc
