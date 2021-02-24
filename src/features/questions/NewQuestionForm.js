import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "react-query";

import { BREAKPOINTS } from "../../constants";
import mutations from "../../api/mutations";

const Wrapper = styled.form`
  padding: 10px;
  padding-top: 64px;
  border-bottom: 1px solid #12415c;
  border-top: none;
  width: 90%;
  margin: 0 auto;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    border-top: 1px solid #12415c;
  }
`;
const TeaxArea = styled.textarea`
  margin-bottom: 1rem;
  background-color: #001321;
  outline: none;
  color: #fff;
  width: 100%;
  resize: none;
  overflow-wrap: anywhere;
  border: none;
`;
const Button = styled.button`
  background-color: #021d2e;
  outline: none;
  border: 1px solid #12415c;
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
const validationSchema = Yup.object().shape({
  content: Yup.string()
    .min(2, "Content is too short!")
    .max(250, "Content is too long, max is 250 characters!")
    .required("This field is required!"),
});
function NewQuestionForm() {
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
        placeholder="What, when, why...ask"
        name="content"
        onChange={formik.handleChange}
        value={formik.values.content}
      />
      {formik.errors.content ? (
        <ErrorMessage>{formik.errors.content}</ErrorMessage>
      ) : null}
      <Button type="submit">Ask</Button>
    </Wrapper>
  );
}

export default NewQuestionForm;
