import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserData.context";

const defaultMovie = {
  title: '',
  description: '',
  runtimeMins: ''
}
const Movie = () => {
  const { currentUser, setCurrentUser } = useContext(UserDataContext);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({ title: '', description: '', runtimeMins: 60 });

  const resetFormFields = () => {
    setMovie(defaultMovie);
  }

  useEffect(() => {

    fetch(`http://localhost:4000/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data.movies)
      );

  }, []);



  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    try {

      const token = localStorage.getItem('authorization');
      const respone = await fetch('http://localhost:4000/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, runtimeMins })

      });

      const data = await respone.json();
      console.log(data, data.data.movie);
      // setContacts([...contacts, contact])
      data.data.movie ? setMovies([...movies, data.data.movie]) : alert('');
      resetFormFields();
    } catch (e) {
      console.log({ e });
    }
  }
  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleCreateMovie(movie);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: name === 'runtimeMins' ? parseInt(value) : value
    });
  }
  return (
    <div className="movie-container">
      {currentUser&&currentUser.role === 'ADMIN' &&
        <div className="movie-creator">
          <h2>Create Movie</h2>
          <form className="form-movie" onSubmit={handleSubmitDecorator}>
            <input type='text' name='title' placeholder="Title" value={movie.title} onChange={handleChange} />
            <input type='text' name='description' placeholder="Description" value={movie.description} onChange={handleChange} />
            <input type='number' name='runtimeMins' placeholder="Runtime (minutes)" value={movie.runtimeMins} onChange={handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      }

      <div className="movie-lists">
        <h1>Movie list</h1>
        <div className="movie-list">
          {movies && movies.map(movie => {
            return (
              <div className="movie-box" key={movie.id}>

                <h3>{movie.title}</h3>
                <p>Description: {movie.description}</p>
                <p>Runtime: {movie.runtimeMins}</p>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  )


}
export default Movie;