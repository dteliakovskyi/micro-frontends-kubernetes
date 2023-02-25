import { FC } from "react";
import { Header } from "../components/Header";
import { Main } from "./Layout.styles";

export const Layout: FC = ({ children }) => (
  <Main>
    <Header />
    {children}
  </Main>
);
