import { atom } from "recoil";
import Movie from "../models/movie.model";

const nominationsState = atom<Movie[]>({
  key: "nominationsState",
  default: [],
});

export default nominationsState;
