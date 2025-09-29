import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <LocalFloristIcon width={10} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jardín Verde Olivo
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            Plantas
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/ubicaciones");
            }}
          >
            Ubicaciones
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/especies");
            }}
          >
            Especies
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/calendar-recommendation");
            }}
          >
            Sugerencias
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
