import { makeStyles, TextField, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import moviesState from "../atoms/moviesState";
import MovieDisplay from "./MovieDisplay";

const { REACT_APP_OMDB_API_KEY: OMDB_API_KEY } = process.env;

async function fetchMovies(searchKey: string) {
  console.log(OMDB_API_KEY);
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
      searchKey
    )}&type=movie`
  );

  if (response.status === 200) {
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } else {
    return { success: false, message: "Something went wrong" };
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  search: {
    marginBottom: theme.spacing(2),
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Movies() {
  const [movies, setMovies] = useRecoilState(moviesState);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      (async () => {
        setLoading(true);
        const { success, data, message } = await fetchMovies(searchTerm);
        setMovies(data?.Search);
        setLoading(false);
      })();
    } else {
      setMovies([]);
    }
  }, [setMovies, searchTerm]);

  return (
    <div className={classes.container}>
      <TextField
        variant="outlined"
        label="Search for a movie"
        onChange={(e) => {
          const val: string = e.target.value;
          setSearchTerm(val);
        }}
        className={classes.search}
        fullWidth
      ></TextField>
      {loading && (
        <Skeleton
          height={200}
          variant="rect"
          className={classes.gutterBottom}
        />
      )}
      {movies?.map((movie) => (
        <MovieDisplay
          movie={movie}
          key={`movie_${movie.imdbID}`}
        ></MovieDisplay>
      ))}
      {!loading && searchTerm && (!movies || movies.length === 0) && (
        <Typography variant="body2">No results</Typography>
      )}
      {!searchTerm && (
        <Typography variant="body2">
          Try searching for movies using the text field above, search results
          will appear here!
        </Typography>
      )}
    </div>
  );
}
