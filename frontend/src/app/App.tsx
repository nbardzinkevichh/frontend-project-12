import { Routes, Route, Navigate } from "react-router-dom";
import routes from '../router/routes.ts';

import { useSelector } from 'react-redux';
import {selectCurrentToken, selectCurrentUser} from '../feauters/Login/authSlice.ts';

import Signup from '../feauters/Signup/Signup.tsx';
import Chat from '../pages/Chat.tsx';
import AuthForm from '../feauters/Login/Login.tsx';
import NotFound from '../pages/NotFound.tsx';

import {ErrorBoundary, Provider} from '@rollbar/react';
import {useEffect, useState} from "react";
import axios from "axios";

const rollbarAccessToken = process.env.ROLLBAR_ACCESS_TOKEN_W;

const rollbarConfig = {
  accessToken: rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true
      },
    },
  },
};

function App() {
  const token = useSelector(selectCurrentToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <Routes>
          <Route path={routes.notFound} element={<NotFound />} />
          <Route path={routes.home} element=
            { isLoggedIn ? <Chat /> : <Navigate to="/login" />}
          />
          <Route path={routes.login} element={<AuthForm />} />
          <Route path={routes.signup} element={<Signup />} />
        </Routes>
      </ErrorBoundary>
    </Provider>

  )
}

export default App
