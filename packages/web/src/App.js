import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Routes from './Routes'
import { CssBaseline } from '@material-ui/core'

const { REACT_APP_API_URL } = process.env
const httpLink = new HttpLink({
  uri: REACT_APP_API_URL
    ? `${REACT_APP_API_URL}graphql`
    : 'http://localhost:8000/graphql'
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const link = from([errorLink, httpLink])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
      <CssBaseline />
    </ApolloProvider>
  )
}

export default App
