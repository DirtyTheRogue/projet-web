import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Création du lien HTTP vers l'API GraphQL (via .env)
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

// Intercepteur pour injecter le token JWT dans les headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Création du client Apollo final
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
