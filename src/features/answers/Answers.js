import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border: 1px solid #12415c;
  display: grid;
`;
const Question = styled.span`
  overflow-wrap: anywhere;
  padding: 5px;
  color: #fff;
`;

function Answers(props) {
  const { answer } = props;
  return (
    <Container>
      <Question>{answer}</Question>
    </Container>
  );
}

export default Answers;
