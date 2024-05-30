import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App.jsx';
import { AuthContextProvider } from './components/context/AuthContext.jsx';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  
     <AuthContextProvider>
      <App />
     </AuthContextProvider>
 
);
