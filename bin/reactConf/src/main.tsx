import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.less'
import App from './App.js';
import store from './store/index.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
);