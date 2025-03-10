import { Routes, Route } from "react-router-dom";
import routes from './routes.ts';

import { useSelector } from 'react-redux';
import {selectCurrentUser} from '../feauters/Login/authSlice.ts';

import Login from '../components/Login/Login.tsx';
import Signup from '../components/Signup/Signup.tsx';
import Chat from './routes/Chat.tsx';
import AuthForm from '../components/Login/Login.tsx';
import NotFound from './routes/NotFound.tsx';

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
            { isLoggedIn ? <Chat /> : <Login />}
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
