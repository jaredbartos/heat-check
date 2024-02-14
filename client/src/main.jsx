import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
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
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
