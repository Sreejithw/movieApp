import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import {styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './index.css'
import { Movies } from './components/Movies/Movies.jsx';
import HomePage from './components/HomePage.jsx';
import theme from './theme.js';
import MovieInfoPage from './components/MovieInformation/MovieInfoPage.jsx';
import Cast from './components/Cast/Cast.jsx';
import { Profile } from './components/Profile/Profile.jsx';
import NavBarNew from './components/NavBar/NavBarNew.jsx';
import bgImg from './assets/movie-bg.jpg';
import { Toolbar } from '@mui/material';

const StyledRootContainer = styled('div')`
  height: 100%;
  display: grid;
  grid-template-areas:
      "header header"
      "sidebar main";
  grid-template-columns: 293px;
  ${'' /* grid-auto-rows: 0px; */}
  background-image: url(${bgImg});
  background-size: cover;
`;

const router = createBrowserRouter([
  {
    path:'/',
    element: (
      <StyledRootContainer>
        <NavBarNew />
        <Toolbar />
        <Outlet />
      </StyledRootContainer>
    ),
    children:[
      {
        path: "/", 
        element: <HomePage />
      },
      {
        path: "/approved?/*", 
        element: <HomePage />
      },
      {
        path:'/movies',
        element: <Movies />
      },
      {
        path:'/movie/:id',
        element: <MovieInfoPage />
      },
      {
        path:'/cast/:id',
        element: <Cast />
      },
      {
        path:'/profile/:id',
        element: <Profile />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
)
