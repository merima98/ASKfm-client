import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
  padding-top: 12rem;
  text-align: center;
`;
const Form = styled.div`
  display: grid;
  margin: 0 auto;
  width: 70%;
  grid-template-rows: repeat(2, 1fr);

  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 30%;
  }
`;
const Logo = styled.div`
  font-size: 20px;
  color: #ee1144;
  font-weight: bold;
  margin-bottom: 2rem;
`;
const Caption = styled.div`
  color: ${(props) => props.theme.colors.color};
  margin-bottom: 2rem;
`;
const LoginButton = styled(NavLink)`
  margin-bottom: 1rem;
  height: 30px;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.color};
  padding: 4px;
`;

const SignupButton = styled(NavLink)`
  margin-bottom: 1rem;
  height: 30px;
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.signupButtonColor};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.signupButtonText};
  padding: 4px;
`;
function Home() {
  return (
    <Wrapper>
      <Logo>ASK.me</Logo>
      <Caption>Curious? Just ask! Openly or anonymously.</Caption>
      <Form>
        <SignupButton exact to="/signup">
          Sign up
        </SignupButton>
        <LoginButton exact to="/login">
          Log in
        </LoginButton>
      </Form>
    </Wrapper>
  );
}

export default Home;
