import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const Loader: FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);
