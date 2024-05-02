import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './utils/themes/theme.js';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SinglePlayer from './pages/SinglePlayer.jsx';
import TeamsPage from './pages/TeamsPage.jsx';
import SingleTeam from './pages/SingleTeam.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Leaderboards from './pages/Leaderboards.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
      },
      {
        path: '/leaderboards',
        element: <Leaderboards />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
