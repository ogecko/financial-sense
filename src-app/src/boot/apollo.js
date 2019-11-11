import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/'
})

// Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Create the apollo provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Boot function to Install the Vue plugin and set the apolloProvider on the root component
export default ({ app, Vue }) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
