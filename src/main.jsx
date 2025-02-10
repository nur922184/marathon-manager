import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Router from './assets/Router/Router';
import AuthProviders from './assets/Provider/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <AuthProviders>
        <RouterProvider router={Router} />
      </AuthProviders>
    </div>
  </StrictMode>,
)
