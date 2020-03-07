import { getMainDefinition } from 'apollo-utilities';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  defaultDataIdFromObject,
} from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { API_URL, WEBSOCKET_API_URL } from './config';
import { middleware } from './middleware';

const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

// Apollo Client
const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    return object._id || object.id || defaultDataIdFromObject(object);
  },
});

const httpLink = new HttpLink({
  uri: API_URL(),
});

const wsLink = new WebSocketLink({
  uri: WEBSOCKET_API_URL(),
  options: {
    reconnect: true,
  },
});

const subscriptionMiddleware = {
  applyMiddleware(options, next) {
    options.authorization = middleware.token
      ? `Bearer ${middleware.token}`
      : '';
    next();
  },
};

wsLink.subscriptionClient.use([subscriptionMiddleware]);

const authLink = setContext((_input, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: middleware.token ? `Bearer ${middleware.token}` : '',
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const apolloClient = new ApolloClient({
  link,
  cache,
});

export { updateObject, apolloClient };
