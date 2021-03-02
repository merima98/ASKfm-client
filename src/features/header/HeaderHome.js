import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  text-align: center;
`;
const Logo = styled(NavLink)`
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
  color: #ee1144;
  text-decoration: none;
`;

function HeaderHome() {
  return (
    <Wrapper>
      <Logo exact to="/">
        ASK.me
      </Logo>
    </Wrapper>
  );
}

export default HeaderHome;
