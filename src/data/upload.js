var gql = require('graphql-tag');
var ApolloClient = require('apollo-client');
var HttpLink = require('apollo-link-http');
var InMemoryCache = require('apollo-cache-inmemory');

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjc79ytsi1i1m01343zs8wdl0' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const quotesQuery = gql`
    query getRandomQuote($lang: String!, $limit: Int!){
        allQuotes(filter: {
            language: $lang
        }, first: $limit) {
            id,
            author,
            quote,
            quoteUrl,
            type
        }
    }`;




