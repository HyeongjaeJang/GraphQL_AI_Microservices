import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const userService = new HttpLink({
  uri: "http://localhost:4002/user/graphql",
  credentials: "include",
});

const postService = new HttpLink({
  uri: "http://localhost:4002/community/graphql",
  credentials: "include",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    if (
      definition.kind === "OperationDefinition" &&
      definition.operation === "query"
    ) {
      if (
        definition.name?.value?.startsWith("User") ||
        definition.name?.value === "Me"
      ) {
        return true;
      }
    }

    if (
      definition.kind === "OperationDefinition" &&
      definition.operation === "mutation"
    ) {
      if (
        definition.name?.value === "Login" ||
        definition.name?.value === "Register" ||
        definition.name?.value === "Logout"
      ) {
        return true;
      }
    }

    return false;
  },
  userService,
  postService,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const GraphQLProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
