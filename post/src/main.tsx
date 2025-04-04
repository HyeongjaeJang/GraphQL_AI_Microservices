import { StrictMode } from "react";
// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// const client = new ApolloClient({
//   uri: "http://localhost:4001/graphql",
//   cache: new InMemoryCache(),
//   credentials: "include",
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ApolloProvider client={client}> */}
    <App />
    {/* </ApolloProvider> */}
  </StrictMode>,
);
