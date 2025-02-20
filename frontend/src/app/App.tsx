import { Routes, Route, Navigate } from "react-router-dom";
import routes from '../router/routes.ts';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../feauters/Login/authSlice.ts';

import Signup from '../feauters/Signup/Signup.tsx';
import Chat from '../pages/Chat.tsx';
import AuthForm from '../feauters/Login/Login.tsx';
import NotFound from '../pages/NotFound.tsx';



function App() {
  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = currentUser === null ? false : true;

  return (
    <Routes>
      <Route path={routes.notFound} element={<NotFound />} />
      <Route path={routes.home} element=
        { isLoggedIn ? <Chat /> : <Navigate to="/login" />}
      />
      <Route path={routes.login} element={<AuthForm />} />
      <Route path={routes.signup} element={<Signup />} />
    </Routes>
  )
}

export default App
