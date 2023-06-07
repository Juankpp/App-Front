import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import { MoviesScreen } from "../components/movies/MoviesScreen";
import { BooksScreen } from "../components/books/BooksScreen";
import { SongsScreen } from "../components/songs/SongsScreen";

export const SisRouter = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/" component={MoviesScreen} />
          <Route path="/movies/:page" component={MoviesScreen} />
          <Route path="/books/:page" component={BooksScreen} />
          <Route path="/songs/:page" component={SongsScreen} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};
