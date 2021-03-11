import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { BREAKPOINTS } from "../../constants";
import HeaderLoggedinUser from "../header/HeaderLoggedinUser";
import queries from "../../api/queries.js";
import mutations from "../../api/mutations.js";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: grid;
  padding-top: 64px;
  grid-gap: 1rem;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 60%;
  }
`;
const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding-top: 64px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 80%;
  }
`;
const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  padding: 4px;
  outline: none;
  color: ${(props) => props.theme.colors.color};
  background-color: ${(props) => props.theme.colors.backgroundColor};

  ${({ error }) =>
    error &&
    `
      border: 1px solid red;
      color: red;
    `}
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.buttonColor};
  outline: none;
  width: 100%;
  overflow-wrap: anywhere;
  border: 1px solid ${(props) => props.theme.colors.buttonBorder};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.buttonText};
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
`;
const ErrorMessage = styled.div`
  margin-bottom: 0.25rem;
  font-size: 12px;
  padding: 9px 0px 7px 8px;
  border-radius: 4px;
  outline: none;
  color: red;
`;

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short!")
    .max(50, "Username is too long!")
    .required("Username is required field!"),
  image: Yup.string().required("Paste URL!"),
});
function UpdateUserProfile() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const history = useHistory();
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const user = loggedUserQuery.data?.data || {};

  const updateUserMutation = useMutation(mutations.updateUser, {
    onSuccess: (data) => {
      history.push(`/user/${data.data.username}`);
      return queryClient.refetchQueries("loggedUser");
    },
    onError: (data) => {
      formik.setErrors({ username: "Username already in use! " });
    },
  });
  function onSubmit(values) {
    try {
      updateUserMutation.mutate(values);
    } catch (err) {}
  }
  const formik = useFormik({
    initialValues: {
      username: user.username,
      image: user.image,
    },
    validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <div>
      <HeaderLoggedinUser />
      <Wrapper>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            onChange={formik.handleChange}
            value={formik.values.username || ""}
            name="username"
            error={formik.errors.username && formik.touched.username}
          />
          {formik.errors.username ? (
            <ErrorMessage>{formik.errors.username}</ErrorMessage>
          ) : null}
          <Input
            onChange={formik.handleChange}
            value={formik.values.image || ""}
            name="image"
            error={formik.errors.url && formik.touched.url}
          />
          {formik.errors.image ? (
            <ErrorMessage>{formik.errors.image}</ErrorMessage>
          ) : null}
          <Button disabled={!(formik.isValid && formik.dirty)} type="submit">
            {`${t("Update")}`}
          </Button>
        </Form>
      </Wrapper>
    </div>
  );
}

export default UpdateUserProfile;
