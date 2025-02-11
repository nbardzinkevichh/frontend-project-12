import { RootState } from './store.ts';
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from '../feauters/AuthForm/AuthForm.tsx';
import NotFound from '../pages/NotFound.tsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../feauters/AuthForm/authSlice.ts';
import Chat from '../pages/Chat.tsx';

import routes from '../router/routes.ts';

function App() {
  const currentUser = useSelector((state: RootState) => selectCurrentUser(state));
  const isLoggedIn = currentUser === null ? false : true;

  return (
    <Routes>
      <Route path={routes.notFound} element={<NotFound />} />
      <Route path={routes.home} element=
        { isLoggedIn ? <Chat /> : <Navigate to="/login" />}
      />
      <Route path={routes.login} element={<AuthForm />} />
    </Routes>
  )
}

export default App
