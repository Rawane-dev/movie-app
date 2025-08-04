import { IoSearch } from "react-icons/io5";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "./Moviecard.jsx";
import { BeatLoader } from "react-spinners";

export default function App() {
  const API_KEY = "a05435da";
  const [input, setInput] = useState(""); // start empty
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = (searchTerm) => {
    setLoading(true);
    axios
      .get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
      .then((res) => {
        if (res.data.Response === "True") {
          setData(res.data.Search);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error("Axios Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Trigger search whenever input changes
  useEffect(() => {
    const searchTerm = input.trim() === "" ? "Batman" : input;
    fetchMovies(searchTerm);
  }, [input]);

  return (
    <div className="container">
      <div className="title">
        <h1>MovieLand</h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie"
          onChange={(e) => setInput(e.target.value)}
        />
        <IoSearch id="icon" />
      </div>

      {loading ? (
        <div className="spinner">
          <BeatLoader color="#f9d3b4" />
        </div>
      ) : (
        <div className="movie-list">
          {data.length > 0 ? (
            data.map((movie) => (
              <Moviecard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}
