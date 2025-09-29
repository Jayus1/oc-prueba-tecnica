import { BrowserRouter } from "react-router";
// import "./App.css";
import AppRouter from "./settings/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import theme from "./settings/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
