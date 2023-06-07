import { Switch, BrowserRouter as Router } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { AuthRouter } from "./AuthRouter";
import { SisRouter } from "./SisRouter";

import { PrivateRoute } from "./PrivateRouteV5";
import { PublicRoute } from "./PublicRouteV5";
import { verificarAutenticacion } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../actions/auth";


export const AppRouter = () => {
  const [cheking, setCheking] = useState(false);

  const [isLogginIn, setIsLogginIn] = useState(false);
  const dispatch = useDispatch();
  
  const {access_token, id, username } = useSelector((state) => state.auth);

  useEffect(() => {
    setCheking(true);
    const isAuthenticated = verificarAutenticacion();
    setIsLogginIn(isAuthenticated);
    setCheking(false);
  }, [dispatch, access_token, id, username, logout]);

  if (cheking) {
    return <h1>Await..</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={isLogginIn}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            exact
            isAuthenticated={isLogginIn}
            path="/*"
            component={SisRouter}
          />
        </Switch>
      </div>
    </Router>
  );
};
