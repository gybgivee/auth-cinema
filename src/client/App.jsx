import './main.css';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav.component';
import User from './components/User.component';
import Movie from './components/Movie.component';
import Register from './components/Register.component';


export default function App() {

  return (
    <Routes>
      <Route index element={<User />}></Route>
      <Route path='movie' element={<Movie />}></Route>
      <Route path='register' element={<Register />}></Route>
    </Routes>
  );
}


