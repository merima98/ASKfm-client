import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useQueryClient, useMutation } from "react-query";

import mutations from "../../api/mutations";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .min(2, "Comment is too short!")
    .max(250, "Comment is too long, max is 250 characters!")
    .required("Comment is required!"),
});

const Wrapper = styled.form`
  padding: 10px;
  border: none;
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.backgroundColorDarker};
`;

const Answer = styled.textarea`
  background-color: ${(props) => props.theme.colors.backgroundColorDarker};
  outline: none;
  color: #fff;
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
  color: #fff;
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

function NewAnswerForm(props) {
  const { id } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      content: "",
      questionId: id,
    },
    onSubmit,
    validationSchema,
  });
  const queryClient = useQueryClient();

  const createAnswerMutation = useMutation(mutations.createAnswer, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries("questions");
    },
  });

  async function onSubmit(values) {
    try {
      createAnswerMutation.mutate(values);
      formik.resetForm();
    } catch (err) {}
  }
  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <input
        name="id"
        onChange={formik.handleChange}
        value={formik.values.questionId}
        hidden
      />
      <Answer
        placeholder={`${t("Leave your comment...")}`}
        name="content"
        onChange={formik.handleChange}
        value={formik.values.content}
      />
      {formik.errors.content ? (
        <ErrorMessage>{formik.errors.content}</ErrorMessage>
      ) : null}
      <Button type="submit">{`${t("Answer")}`}</Button>
    </Wrapper>
  );
}

export default NewAnswerForm;
