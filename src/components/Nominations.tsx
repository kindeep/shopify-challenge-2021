import { makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useRecoilState } from "recoil";
import nominationsState from "../atoms/nominationsState";
import MovieDisplay from "./MovieDisplay";
import MuiAlert from "@material-ui/lab/Alert";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
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
      <motion.div layout>
        {nominations && nominations.length === 5 && (
          <MuiAlert className={classes.gutterBottom} variant="filled">
            You've selected all 5 Nominations!
          </MuiAlert>
        )}
      </motion.div>
      <AnimateSharedLayout>
        <motion.div>
          {nominations?.map((movie) => (
            <div key={`nomination_${movie.imdbID}`}>
              <motion.div layout>
                <AnimatePresence>
                  <MovieDisplay movie={movie}></MovieDisplay>
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </AnimateSharedLayout>

      <motion.div layout>
        {(!nominations || nominations.length === 0) && (
          <MuiAlert
            className={classes.gutterBottom}
            variant="filled"
            severity="warning"
          >
            You don't have any nominations! Search for movies and add
            nominations to this list.
          </MuiAlert>
        )}
      </motion.div>
    </div>
  );
}
