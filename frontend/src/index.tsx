import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@forevolve/bootstrap-dark/dist/css/bootstrap-dark.css";
import App from "./App";
import { createApolloClient } from "./graphql/createApolloClient";

const graphqlApolloClient = createApolloClient();

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={graphqlApolloClient}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
