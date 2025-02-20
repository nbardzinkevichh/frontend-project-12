
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import i18n from './i18n/i18n';

import App from './app/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

console.log('i18n initialization: ', i18n);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  </StrictMode>,
);  