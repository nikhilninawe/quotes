import gql from 'graphql-tag';

const quotesQuery = gql`
    query getRandomQuote($lang: String!, $limit: Int!, $skip: Int!){
        allQuotes(filter: {
            language: $lang
        }, first: $limit, skip: $skip) {
            id,
            author,
            quote,
            quoteUrl,
            type
        }
    }`;

export default quotesQuery;

