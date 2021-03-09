import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";

import HeaderLoggedinUser from "../header/HeaderLoggedinUser";
import NewQuestionForm from "./NewQuestionForm";
import SingleAnsweredQuestion from "./SingleAnsweredQuestion";
import { BREAKPOINTS } from "../../constants";
import queries from "../../api/queries";
import mutations from "../../api/mutations";

import NavidationMenu from "../navigation/NavidationMenu";

const Container = styled.div`
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    grid-template-columns: 1fr 2fr;
    display: grid;
  }
`;

const RightSideContainer = styled.div`
  padding-top: ${(props) => (props.location !== "/" ? "64px" : "0px")};
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    display: grid;
    grid-gap: 1rem;
  }
`;

function AnsweredQuestions() {
  const location = useLocation();

  const { data } = useQuery(
    "questions",
    location.pathname === "/"
      ? () => queries.hotestQuestions()
      : () => queries.questions()
  );
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
        <NavidationMenu />
        <div>
          <HeaderLoggedinUser />
          <RightSideContainer location={location.pathname}>
            {location.pathname === "/" && <NewQuestionForm />}
            <div>
              {questions.map((question) => {
                return (
                  <SingleAnsweredQuestion
                    key={question.id}
                    id={question.id}
                    question={question.content}
                    totalHearts={question.totalHearts}
                    likeCount={question.likes.length}
                    dislikeCount={question.Dislikes.length}
                    likeQuestion={() => handleOnLike(question.id)}
                    dislikeQuestion={() => handleOnDislike(question.id)}
                    answersCount={question.Answer.length}
                    answers={question.Answer}
                    fullWidth={false}
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
