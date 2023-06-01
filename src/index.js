import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './constants/theme';
import { App } from 'components/App';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyle } from 'GlobalStyle';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App title="Phonebook" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
