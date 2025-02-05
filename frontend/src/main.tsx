import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './components/App.tsx'
import AuthForm from './components/AuthForm/AuthForm.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<App />} />
        <Route path="/login" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


//  <Route path="/lohin" element={<Login />} />
