import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchGames from "./pages/SearchGames";
// import SavedGames from "./pages/SavedGames";
import Navbar from "./components/Navbar";

// TODO: when deploy to heroku, set `GRAPHQL_API_URL` to the api endpoint
const graphqlURL = process.env.GRAPHQL_API_URL || 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
  uri: graphqlURL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<SearchGames />} />
            {/* <Route exact path="/saved" element={SavedGames} /> */}
            {/* <Route render={() => <h1 className="display-2">Wrong page!</h1>} /> */}
          </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;