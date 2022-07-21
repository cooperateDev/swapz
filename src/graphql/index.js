import { ApolloClient, InMemoryCache } from "@apollo/client";

export { gql, useQuery, useLazyQuery } from "@apollo/client";
export { ApolloProvider } from "@apollo/client/react";

const GRAPHQL_ENDPOINT =
  "https://morning-springs-99941.herokuapp.com/https://graphql.bitquery.io";

export const APOLLO_CLIENT = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    "X-API-KEY": "BQYs2j1gwycexAmnD214TMh4pP3vvKQv",
  },
});
