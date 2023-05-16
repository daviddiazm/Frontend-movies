import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home, Directors, Actors, MovieDetail } from './pages'
import { LoadingScreen, NavBar, Notification } from './components'
import { useEffect } from 'react'
import { getGenresThunk } from './store/slices/genres.slice'
import { useDispatch, useSelector } from 'react-redux'
import { getActorsThunk } from './store/slices/actors.slice'
import { getDirectorsThunk } from './store/slices/directors.slice'
import { getMoviesThunk } from './store/slices/movies.slice'
import MovieForm from './pages/MovieForm'

function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.isLoading);

  useEffect(() => {
    dispatch(getGenresThunk());
    dispatch(getActorsThunk());
    dispatch(getDirectorsThunk());
    dispatch(getMoviesThunk());
  }, [])

  return (
    <HashRouter>
      <div className="educational-purposes" >
            Front-end made by Academlo instructors for educational purposes
        </div>
      <NavBar />
      <Notification />
      { isLoading && <LoadingScreen /> }
      <Container className='my-5'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies/add" element={<MovieForm />} />
          <Route path="/movies/update/:id" element={<MovieForm />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
