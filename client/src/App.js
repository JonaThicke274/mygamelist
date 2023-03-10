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
import SavedGames from "./pages/SavedGames";
import Navbar from "./components/Navbar";

import background from "./photos/img3.png"

// TODO: when deploy to heroku, set `GRAPHQL_API_URL` to the api endpoint
const graphqlURL = process.env.GRAPHQL_API_URL || 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
  uri: '/graphql'
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
  cache: new InMemoryCache({
    addTypename: false
  }),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <div style = {{ backgroundImage: `url(${background})`, 'height':'100vh', backgroundPosition: 'center'}}>
          <Router>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<SearchGames />} />
                <Route exact path="/saved" element={<SavedGames />} />
                <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
              </Routes>
          </Router>
        </div>
      </ApolloProvider>

  );
}

export default App;