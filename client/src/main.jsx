import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App.jsx'
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SinglePlayer from './pages/SinglePlayer.jsx';
import TeamsPage from './pages/TeamsPage.jsx';
import SingleTeam from './pages/SingleTeam.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/player/:id',
        element: <SinglePlayer />
      },
      {
        path: '/teams',
        element: <TeamsPage />
      },
      {
        path: '/team/:id',
        element: <SingleTeam />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>    
  </React.StrictMode>,
)
