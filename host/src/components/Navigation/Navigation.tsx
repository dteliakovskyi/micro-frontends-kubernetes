import { ListItemButton } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NavItem } from "../NavigationItem";
import { NavigationList } from "./Navigation.styles";

export const Navigation = () => {
  const history = useHistory();

  const handleClick = async () => {
    await axios.post("/api/users/signout");
    sessionStorage.clear();

    location.reload();
  };

  return (
    <NavigationList sx={{ height: "100%" }}>
      <NavItem title="Tickets" path="/" />
      <NavItem title="Orders" path="/orders" />
      <ListItemButton onClick={handleClick}>Logout</ListItemButton>
    </NavigationList>
  );
};
