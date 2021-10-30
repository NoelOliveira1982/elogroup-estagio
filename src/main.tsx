import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './Views/Home';
import './global.css';
import { AuthProvider } from './Contexts/AuthContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Home />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
