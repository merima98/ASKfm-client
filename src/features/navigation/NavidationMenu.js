import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";

import { BREAKPOINTS } from "../../constants";
import queries from "../../api/queries";

const LeftSideContainer = styled.div`
  position: sticky;
  top: 35px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 14px;
  text-align: center;
  background-color: #021d2e;
  margin-bottom: 2rem;
  border-bottom: 1px solid #12415c;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    border-right: 1px solid #12415c;
    border-bottom: none;
    height: 100vh;
    position: sticky;
    margin-bottom: 0rem;
    top: 0;
    bottom: 0;
  }
`;
const Links = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0rem;
  font-size: 14px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    margin-bottom: 2rem;
  }
`;

function NavidationMenu() {
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const user = loggedUserQuery.data?.data || {};
  return (
    <LeftSideContainer>
      <Links exact to="/">
        Latest
      </Links>
      <Links exact to="/">
        Hot Questions
      </Links>
      <Links exact to={`/user/${user.username}`}>
        My Questions
      </Links>
    </LeftSideContainer>
  );
}

export default NavidationMenu;
