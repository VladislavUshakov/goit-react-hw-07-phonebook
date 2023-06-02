import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './constants/theme';
import { App } from 'components/App';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyle } from 'GlobalStyle';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App title="Phonebook" />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
