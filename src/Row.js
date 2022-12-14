import React, { useEffect, useState } from 'react';
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow = false}) {
    
    const [movies, setMovies] = useState([]);
      
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);
    
    const youtubeOpts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
    };

    const movieClicked = (moviename) => {
        console.log(moviename);
        if (trailerUrl != ""){ 
            setTrailerUrl("");
        }else {
          movieTrailer(moviename)
            .then((url) => {
              const urlParamV = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParamV.get("v"));
            })
            .catch((err) => console.log(err));
        }
      };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(
                    (movie) =>
                      ((isLargeRow && movie.poster_path) ||
                      (!isLargeRow && movie.backdrop_path)) && (
                          <img
                          onClick={() =>
                            movieClicked(movie.name || movie.title || movie.orginal_name)
                          }
                          key={movie.id}
                           className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                           key={movie.id}
                           src={`${base_url}${
                               isLargeRow ? movie.poster_path :movie.backdrop_path
                           }`}
                           alt={movie.name}
                          />
                      )
                )}
            </div>
            {trailerUrl != "" && <YouTube videoId={trailerUrl} opts={youtubeOpts} />}
        </div>    
    );
}

export default Row;