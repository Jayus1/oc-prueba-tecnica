import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} rowGap={1}>
      <Navbar />
      <Outlet />
    </Box>
  );
};
export default MainLayout;
