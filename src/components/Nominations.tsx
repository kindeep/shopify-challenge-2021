import { makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useRecoilState } from "recoil";
import nominationsState from "../atoms/nominationsState";
import MovieDisplay from "./MovieDisplay";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

export default function NOminations() {
  const [nominations, setNominations] = useRecoilState(nominationsState);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h6" gutterBottom>
        Your Nominations
      </Typography>
      {nominations?.map((movie) => (
        <MovieDisplay
          movie={movie}
          variant="delete"
          key={`movie_${movie.imdbID}`}
        ></MovieDisplay>
      ))}
      {(!nominations || nominations.length === 0) && (
        <>
          <Typography variant="body2">
            Your nominations are empty, try searching for movies and add them to
            this list.
          </Typography>
        </>
      )}
    </div>
  );
}
