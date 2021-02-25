import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { User, LogOut } from "react-feather";
import { useQuery } from "react-query";
import { useAuth } from "../../state";

import queries from "../../api/queries.js";
import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  border-bottom: 1px solid #12415c;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #021d2e;
  right: 0;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;
const Logo = styled(NavLink)`
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
  color: #ee1144;
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
`;
const StyledLinks = styled.div`
  color: #fff;
  margin-right: 0.5rem;
  height: 12px;
  width: 12px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    margin-right: 1rem;
    height: 20px;
    width: 20px;
  }
`;

const StyledNavigationLinks = styled(NavLink)`
  color: #fff;
  margin-right: 0.5rem;
  height: 12px;
  width: 12px;
  cursor: pointer;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    margin-right: 1rem;
    height: 20px;
    width: 20px;
  }
`;

const StyledUser = styled(User)`
  color: #fff;
  margin-right: 0.5rem;
  height: 16px;
  width: 16px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    margin-right: 1rem;
    height: 20px;
    width: 20px;
  }
`;

const StyledLogOut = styled(LogOut)`
  color: #fff;
  margin-right: 0.5rem;
  height: 16px;
  width: 16px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    margin-right: 1rem;
    height: 20px;
    width: 20px;
  }
`;
function HeaderLoggedinUser() {
  const history = useHistory();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const user = loggedUserQuery.data?.data || {};

  function logout() {
    const token = null;
    history.push("/");
    setIsLoggedIn(false, token);
  }
  return (
    <Wrapper>
      <Logo exact to="/">
        ASK.me
      </Logo>
      <Container>
        <StyledNavigationLinks exact to={`/user/${user.username}`}>
          <StyledUser />
        </StyledNavigationLinks>
        <StyledLinks>
          <StyledLogOut onClick={() => logout()} />
        </StyledLinks>
      </Container>
    </Wrapper>
  );
}

export default HeaderLoggedinUser;
