import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './Views/Home';
import './global.css';
import { AuthProvider } from './Contexts/AuthContext';
import { Leads } from './Views/Leads';
import { NewLead } from './Views/NewLead';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NewLead />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
