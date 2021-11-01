import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import { AuthProvider } from './Contexts/AuthContext';
import { Routes } from './routes';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
