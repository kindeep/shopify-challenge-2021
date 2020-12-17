import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Movie from "../models/movie.model";
import nominationsState from "../atoms/nominationsState";
import { useRecoilState } from "recoil";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    display: "flex",
  },
  posterBg: {
    position: "absolute",
    top: -10,
    left: -10,
    bottom: -10,
    right: -10,
    backgroundSize: "cover !important",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    filter: "blur(5px) brightness(0.4)",
    width: "calc(100% + 20px)",
    height: "calc(100% + 20px)",
  },
  poster: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
    zIndex: 2,
  },
  posterImgBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
    filter: "brightness(1)",
    zIndex: 1,
  },
  posterContainer: {
    minHeight: "8rem",
    position: "relative",
    overflow: "hidden",
    flex: "50%",
  },
  content: {
    flex: "50%",
  },
}));

export default function MovieDisplay({ movie }: { movie: Movie }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [nominations, setNominations] = useRecoilState(nominationsState);
  const nominated =
    nominations.findIndex((m) => m.imdbID === movie.imdbID) !== -1;
  return (
    <>
      <Card variant="outlined" className={classes.card}>
        <div className={classes.posterContainer}>
          <img src={movie.Poster} className={classes.poster} alt=""></img>
          <img src={movie.Poster} className={classes.posterImgBg} alt=""></img>
          {/* Handle png backgrounds */}
          <div
            style={{ backgroundImage: `url(${movie.Poster})` }}
            className={classes.posterBg}
          ></div>
        </div>
        <div className={classes.content}>
          <CardHeader title={movie.Title} subheader={movie.Year}></CardHeader>
          <CardActions>
            {!nominated && (
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setNominations((prev) => {
                    if (prev.length < 5) {
                      return [{ ...movie }, ...prev];
                    } else {
                      enqueueSnackbar(
                        "You already have 5 nominations! delete one of them if you want to add a different one.",
                        { variant: "error" }
                      );
                      return prev;
                    }
                  });
                }}
              >
                Nominate movie
              </Button>
            )}
            {nominated && (
              <>
                <Tooltip title="Remove nomination">
                  <IconButton
                    onClick={() => {
                      setNominations((prev) => {
                        const deleteIndex = prev.findIndex(
                          (m) => m.imdbID === movie.imdbID
                        );
                        const newList = [...prev];
                        newList.splice(deleteIndex, 1);
                        return newList;
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </CardActions>
        </div>
      </Card>
    </>
  );
}
