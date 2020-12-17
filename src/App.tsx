import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import "./App.css";
import Movies from "./components/Movies";
import Nominations from "./components/Nominations";

function App() {
  return (
    <div className="AppRoot">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">NominatOR 5000</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12} md={6}>
            <Movies></Movies>
          </Grid>
          <Grid item sm={12} xs={12} md={6}>
            <Nominations />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
