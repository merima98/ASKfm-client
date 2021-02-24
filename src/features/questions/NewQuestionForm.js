import React from "react";
import styled from "styled-components";

import { BREAKPOINTS } from "../../constants";

const Wrapper = styled.div`
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
function NewQuestionForm() {
  return (
    <Wrapper>
      <TeaxArea placeholder="What, when, why...ask" />
      <Button>Ask</Button>
    </Wrapper>
  );
}

export default NewQuestionForm;
