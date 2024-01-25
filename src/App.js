import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("movie");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  const handleReloadClick = () => {
    window.location.reload();
  };

  const [imageClicked, setImageClicked] = useState(false);
  const handleClick = () => {
    setImageClicked(!imageClicked);
  };
  if (imageClicked) {
    console.log("Image was clicked.");
  }

  return (
    <div className="app">
      <div className="Navbar">
        <h1 onClick={handleReloadClick}>
          <BiSolidCameraMovie /> Movie Hub
        </h1>

        <div className="search">
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
            placeholder="Enter Keywords..."
          />
        </div>
        <div className="login">
          <p>
            <FaUser />
          </p>
        </div>
      </div>

      {movies?.length > 0 ? (
        <div className="container" onClick={handleClick}>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Result.</h2>
        </div>
      )}
    </div>
  );
};

export default App;
