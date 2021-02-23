import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import HeaderHome from "../header/HeaderHome";

const Wrapper = styled.div`
  align-items: center;
  padding-top: 5rem;
  justify-content: space-around;
  max-width: 350px;
  margin: 0 auto;
`;
const Title = styled.div`
  padding-top: 12px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  font-size: 10px;
  margin-bottom: 0.5rem;
`;
const Link = styled(NavLink)`
  text-decoration: none;
  color: #ee1144;
`;
const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  font-size: 16px;
  outline: none;
  margin-bottom: 1rem;
  padding: 5px;
  border-radius: 2px;
  border: 0.5px solid #d5d5dd;
  color: #d5d5dd;
`;

const Button = styled.button`
  background-color: #ee1144;
  margin-bottom: 2rem;
  font-size: 20px;
  border-radius: 4px;
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 5px;
`;

function Login() {
  return (
    <Wrapper>
      <HeaderHome />
      <Form>
        <Title>Log in</Title>
        <Description>
          Don't have an account yet?{" "}
          <Link exact to="/signup">
            Sign up
          </Link>
        </Description>
        <Label>Login</Label>
        <Input placeholder="Username or email" />
        <Label>Password</Label>
        <Input placeholder="Password" />
        <Button>Login</Button>
      </Form>
    </Wrapper>
  );
}

export default Login;
