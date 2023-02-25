import { Theme } from "@mui/material";

import Backdrop from "./Backdrop";
import Button from "./Button";
import Card from "./Card";
import Paper from "./Paper";
import Table from "./Table";
import Tooltip from "./Tooltip";
import Typography from "./Typography";

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Card(theme),
    Table(theme),
    Paper(),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme)
  );
}
