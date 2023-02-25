import { createTheme, ThemeOptions } from "@mui/material";
import palette from "./palette";

const theme: ThemeOptions = createTheme({
  palette,
  shape: { borderRadius: 6 },
});

export type ThemeType = typeof theme;
export default theme;
