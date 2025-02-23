import { Routes, Route, Navigate } from "react-router-dom";
import routes from '../router/routes.ts';

import { useSelector } from 'react-redux';
import {selectCurrentUser} from '../feauters/Login/authSlice.ts';

import Signup from '../feauters/Signup/Signup.tsx';
import Chat from '../pages/Chat.tsx';
import AuthForm from '../feauters/Login/Login.tsx';
import NotFound from '../pages/NotFound.tsx';

import {ErrorBoundary, Provider} from '@rollbar/react';
import {ToastContainer} from "react-toastify";

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
  const username = useSelector(selectCurrentUser);
  const isLoggedIn = username === null ? false : true;

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
        <ToastContainer />

      </ErrorBoundary>
    </Provider>

  )
}

export default App
