import gql from 'graphql-tag';

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

export default quotesQuery;

