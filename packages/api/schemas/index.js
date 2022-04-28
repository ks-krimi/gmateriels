import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
})

export default schema
