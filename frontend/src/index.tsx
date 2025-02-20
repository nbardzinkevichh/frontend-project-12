
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import i18n from './i18n/i18n';

import App from './app/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Provider as RollbarProvider } from '@rollbar/react';

const rollbarAccessToken = process.env.ROLLBAR_ACCESS_TOKEN_R;

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

console.log('i18n initialization: ', i18n);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </RollbarProvider>

  </StrictMode>,
);  