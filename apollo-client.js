import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/cku58hwrz18lz01xnes7e831e/master",
  cache: new InMemoryCache(),
});

export default client;
