import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import { BREAKPOINTS } from "../../constants";
import queries from "../../api/queries";
import LanguageForm from "../languageForm/LanguageForm";

const LeftSideContainer = styled.div`
  position: sticky;
  top: 35px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 14px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  margin-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    border-right: 1px solid ${(props) => props.theme.colors.border};
    border-bottom: none;
    height: 100vh;
    position: sticky;
    margin-bottom: 0rem;
    top: 0;
    bottom: 0;
  }
`;
const Links = styled(NavLink)`
  color: ${(props) => props.theme.colors.color};
  text-decoration: none;
  margin-bottom: 0rem;
  font-size: 14px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    margin-bottom: 2rem;
  }

  &.active {
    color: ${(props) => props.theme.colors.activeLinks};
    font-weight: bold;
  }
`;

function NavidationMenu() {
  const { t } = useTranslation();
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const user = loggedUserQuery.data?.data || {};
  return (
    <LeftSideContainer>
      <Links exact to="/latest">
        {`${t("Latest")}`}
      </Links>
      <Links exact to="/">
        {`${t("Hot Questions")}`}
      </Links>
      <Links exact to={`/user/${user.username}`}>
        {`${t("My Questions")}`}
      </Links>
      <LanguageForm />
    </LeftSideContainer>
  );
}

export default NavidationMenu;
