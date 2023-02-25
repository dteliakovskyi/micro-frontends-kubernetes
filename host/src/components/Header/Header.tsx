import { Container, Typography } from "@mui/material";
import { Navigation } from "../Navigation";
import { HeaderContainer } from "./Header.styles";

export const Header = () => {
  return (
    <HeaderContainer>
      <Typography>Atlas</Typography>
      <Navigation />
    </HeaderContainer>
  );
};
