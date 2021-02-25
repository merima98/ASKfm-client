import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import HeaderLoggedinUser from "../header/HeaderLoggedinUser";
import NewQuestionForm from "./NewQuestionForm";
import SingleAnsweredQuestion from "./SingleAnsweredQuestion";
import { BREAKPOINTS } from "../../constants";
import queries from "../../api/queries";
import mutations from "../../api/mutations";

const Container = styled.div`
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    grid-template-columns: 1fr 2fr;
    display: grid;
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
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: grid;
    grid-gap: 1rem;
  }
`;

function AnsweredQuestions() {
  const { data } = useQuery("questions", () => queries.questions());
  const questions = data ? data.data : [];

  const likeQuestionMutation = useMutation(mutations.likeQuestion, {
    onSuccess: (data) => {
      if (!data.data.dislikes && data.data.like) {
        questions.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newLikes = question.likes;
            newLikes.push(data.data.like);
            return { ...question, Dislikes: newLikes };
          }
          return question;
        });
      } else if (data.data.dislikes && data.data.like) {
        questions.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newDislikes = question.likes;
            newDislikes.push(data.data.dislikes);
            const newLikes = question.Dislikes;
            newLikes.pop();
            return { ...question, Dislikes: newDislikes, likes: newLikes };
          }
          return question;
        });
      } else {
        questions.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newLikes = question.likes;
            newLikes.pop();
            return { ...question, likes: newLikes };
          }
          return question;
        });
      }
    },
  });

  async function handleOnLike(id) {
    return likeQuestionMutation.mutate(id);
  }

  const dislikeQuestionMutation = useMutation(mutations.dislikeQuestion, {
    onSuccess: (data) => {
      if (data.data.dislikes && !data.data.like) {
        questions.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newLikes = question.Dislikes;
            newLikes.push(data.data.Dislikes);
            return { ...question, Dislikes: newLikes };
          }
          return question;
        });
      } else if (data.data.dislikes && data.data.like) {
        questions.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newDislikes = question.Dislikes;
            newDislikes.push(data.data.dislikes);
            const newLikes = question.likes;
            newLikes.pop();
            return { ...question, Dislikes: newDislikes, likes: newLikes };
          }
          return question;
        });
      } else {
        questions.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newLikes = question.Dislikes;
            newLikes.pop();
            return { ...question, Dislikes: newLikes };
          }
          return question;
        });
      }
    },
  });

  async function handleOnDislike(id) {
    return dislikeQuestionMutation.mutate(id);
  }
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
                return (
                  <SingleAnsweredQuestion
                    key={question.id}
                    id={question.id}
                    question={question.content}
                    likeCount={question.likes.length}
                    dislikeCount={question.Dislikes.length}
                    likeQuestion={() => handleOnLike(question.id)}
                    dislikeQuestion={() => handleOnDislike(question.id)}
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
