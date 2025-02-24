import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './app/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './feauters/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import i18n from './lib/i18n/i18n';

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