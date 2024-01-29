import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { MoviePage } from './components/MovieInformation/MoviePage';
import { MovieInfoPage } from './components/MovieInformation/MovieInfoPage';
import { Cast } from './components/Cast/Cast';
import { Profile } from './components/Profile/Profile';
import { NavBar } from './components/NavBar/NavBar';

const App = () => {

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <main>
        <Routes>
          <Route path="/movie/:id" element={<MovieInfoPage />}/>
          <Route path="/cast/:id" element={<Cast />}/>
          <Route path="/movies" element={<MoviePage />}/>
          <Route path="/profile/:id" element={<Profile />}/>
          <Route path="/" element={<HomePage />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
