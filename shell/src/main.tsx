import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import GraphQLProvider from "./GraphqlProvider.tsx";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "http://localhost:4002/graphql",
//   credentials: "include",
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ApolloProvider client={client}> */}
    <GraphQLProvider>
      <App />
    </GraphQLProvider>
    {/* </ApolloProvider> */}
  </StrictMode>,
);
