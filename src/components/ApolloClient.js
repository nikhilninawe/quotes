import { InMemoryCache } from 'apollo-cache-inmemory/lib/index';
import { HttpLink } from 'apollo-link-http/lib/index';
import { ApolloClient } from 'apollo-client/index';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjc79ytsi1i1m01343zs8wdl0' }),
  cache: new InMemoryCache()
});

export default client;
