import './App.css'
import { RootState } from './services/index.ts';
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from './routes/AuthForm/AuthForm.tsx';
import NotFound from './routes/NotFound.tsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './services/authSlice.ts';
import Chat from './Chat.tsx';



function App() {
  const currentUser = useSelector((state: RootState) => selectCurrentUser(state));
  const isLoggedIn = currentUser === null ? false : true;

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element=
        { isLoggedIn ? <Chat /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<AuthForm />} />
    </Routes>
  )
}

export default App
