import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";

import HeaderLoggedinUser from "../header/HeaderLoggedinUser";
import NewQuestionForm from "./NewQuestionForm";
import SingleAnsweredQuestion from "./SingleAnsweredQuestion";
import { BREAKPOINTS } from "../../constants";
import queries from "../../api/queries";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    grid-template-columns: 1fr 2fr;
  }
`;
const LeftSideContainer = styled.div`
  position: sticky;
  top: 35px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 14px;
  text-align: center;
  background-color: #021d2e;
  margin-bottom: 2rem;
  border-bottom: 1px solid #12415c;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    border-right: 1px solid #12415c;
    border-bottom: none;
    height: 100vh;
    position: sticky;
    margin-bottom: 0rem;
    top: 0;
    bottom: 0;
  }
`;
const Links = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0rem;
  font-size: 14px;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    margin-bottom: 2rem;
  }
`;
const RightSideContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

function AnsweredQuestions() {
  const { data } = useQuery("questions", () => queries.questions());
  const questions = data ? data.data : [];

  return (
    <div>
      <Container>
        <LeftSideContainer>
          <Links exact to="/">
            Latest
          </Links>
          <Links exact to="/">
            Hot Questions
          </Links>
          <Links exact to="/">
            Popular Questions
          </Links>
          <Links exact to="/">
            My Questions
          </Links>
        </LeftSideContainer>
        <div>
          <HeaderLoggedinUser />
          <RightSideContainer>
            <NewQuestionForm />
            <div>
              {questions.map((question) => {
                console.log(question);
                return (
                  <SingleAnsweredQuestion
                    key={question.id}
                    question={question.content}
                  />
                );
              })}
            </div>
          </RightSideContainer>
        </div>
      </Container>
    </div>
  );
}

export default AnsweredQuestions;
