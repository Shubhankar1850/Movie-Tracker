import './App.css'
import Home from './Pages/Home'
import { Routes, Route } from "react-router";
import Layout from './Pages/Layout';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import Favorites from './Pages/Favorites';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path="/movies/:id" element={<MovieDetails/>}/>
      </Routes>
    </Layout>
  )
}

export default App
