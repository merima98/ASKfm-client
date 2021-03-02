import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";

import { useAuth } from "../../state";
import mutations from "../../api/mutations";
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
  color: ${(props) => props.theme.colors.color};
`;

const Description = styled.div`
  font-size: 10px;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.color};
`;
const Link = styled(NavLink)`
  text-decoration: none;
  color: #ee1144;
`;
const Form = styled.form`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;
const ErrorMessage = styled.div`
  margin-bottom: 0.25rem;
  font-size: 12px;
  padding: 9px 0px 7px 8px;
  border-radius: 4px;
  outline: none;
  color: red;
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.color};
`;
const Input = styled.input`
  font-size: 14px;
  outline: none;
  margin-bottom: 1rem;
  padding: 10px;
  border-radius: 2px;
  border: 0.5px solid ${(props) => props.theme.colors.border};
  color: #d5d5dd;

  ${({ error }) =>
    error &&
    `
      border: 1px solid red;
      color: red;
    `}
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

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("This field is required!"),
  password: Yup.string()
    .min(2, "Password is too short!")
    .max(50, "Password is too long!")
    .required("Password is required field!"),
});

function Login() {
  const history = useHistory();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);

  const loginMutation = useMutation(mutations.signin, {
    onSuccess: (data) => {
      setIsLoggedIn(true, data.data.token);
      history.push("/");
    },
  });

  async function onSubmit(values) {
    try {
      loginMutation.mutate(values);
    } catch (err) {
      if (err.response.data.exception === "UserNotFound") {
        formik.setErrors({ password: "Username or password is incorrect!" });
      }
    }
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <Wrapper>
      <HeaderHome />
      <Form onSubmit={formik.handleSubmit}>
        <Title>Log in</Title>
        <Description>
          Don't have an account yet?{" "}
          <Link exact to="/signup">
            Sign up
          </Link>
        </Description>
        <Label>Login</Label>
        <Input
          placeholder="Username or email"
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          error={formik.errors.password && formik.touched.password}
        />
        {formik.errors.username ? (
          <ErrorMessage>{formik.errors.username}</ErrorMessage>
        ) : null}
        <Label>Password</Label>
        <Input
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          type="password"
          autoComplete="off"
          error={formik.errors.password && formik.touched.password}
        />
        {formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}
        <Button disabled={!(formik.isValid && formik.dirty)} type="submit">
          Login
        </Button>
      </Form>
    </Wrapper>
  );
}

export default Login;
