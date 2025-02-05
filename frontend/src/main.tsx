import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import App from './components/App.tsx'
import AuthForm from './components/routes/AuthForm/AuthForm.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/routes/NotFound.tsx';
import { setCredentials } from './components/services/authSlice.ts';

import store from './components/services/index.ts';
import { Provider } from 'react-redux';


const loggedIn = localStorage.token === undefined ? false : true;

const AppRoute = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element=
          { loggedIn ? <AppRoute /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);