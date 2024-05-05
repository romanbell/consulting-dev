import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/roboto-mono"; // Defaults to weight 400

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
  // document.body.addEventListener('keydown', App.handleImgSwitch)
);