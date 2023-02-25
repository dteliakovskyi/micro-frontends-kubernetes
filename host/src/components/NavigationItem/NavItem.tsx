import { ListItemButton, ListItemText } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type NavItemProps = {
  title: string;
  path: string;
};

export const NavItem: FC<NavItemProps> = ({ title, path }) => {
  return (
    <ListItemButton>
      <Link to={path}>
        <ListItemText>{title}</ListItemText>
      </Link>
    </ListItemButton>
  );
};
