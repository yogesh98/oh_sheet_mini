import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  () => document.title = "📜 Oh Sheet!"
);
