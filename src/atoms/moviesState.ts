import { atom } from "recoil";
import Movie from "../models/movie.model";

const moviesState = atom<Movie[]>({
  key: "moviesState",
  default: [],
});

export default moviesState;
