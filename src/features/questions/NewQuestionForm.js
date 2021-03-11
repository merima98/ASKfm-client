import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useQueryClient, useMutation } from "react-query";

import { BREAKPOINTS } from "../../constants";
import mutations from "../../api/mutations";

const Wrapper = styled.form`
  padding: 10px;
  padding-top: 64px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  border-top: none;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 1rem;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    border-top: 1px solid ${(props) => props.theme.colors.border};
    margin-bottom: 0rem;
  }
`;
const TeaxArea = styled.textarea`
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.backgroundColorDarker};
  outline: none;
  color: ${(props) => props.theme.colors.color};
  width: 100%;
  resize: none;
  overflow-wrap: anywhere;
  border: none;
  font-family: "Segoe UI";
  ::placeholder {
    color: ${(props) => props.theme.colors.activeLinks};
    font-family: "Segoe UI";
  }
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.colors.buttonColor};
  outline: none;
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
  content: Yup.string()
    .min(2, "Content is too short!")
    .max(250, "Content is too long, max is 250 characters!")
    .required("This field is required!"),
});
function NewQuestionForm() {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit,
    validationSchema,
  });

  const queryClient = useQueryClient();

  const createQuestionMutation = useMutation(mutations.createQuestion, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries("questions");
    },
  });

  async function onSubmit(values) {
    try {
      createQuestionMutation.mutate(values);
      formik.resetForm();
    } catch (err) {}
  }
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <TeaxArea
        placeholder={`${t("What, when, why... ask")}`}
        name="content"
        onChange={formik.handleChange}
        value={formik.values.content}
      />
      {formik.errors.content ? (
        <ErrorMessage>{formik.errors.content}</ErrorMessage>
      ) : null}
      <Button type="submit">{`${t("Ask")}`}</Button>
    </Wrapper>
  );
}

export default NewQuestionForm;
