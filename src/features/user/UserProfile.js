import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import queries from "../../api/queries";
import mutations from "../../api/mutations";
import { BREAKPOINTS } from "../../constants";
import HeaderLoggedinUser from "../header/HeaderLoggedinUser";
import SingleAnsweredQuestion from "../questions/SingleAnsweredQuestion";

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
const Container = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const UserInformation = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
`;
const UsernameBig = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.color};
`;
const UsernameSmall = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.color};
`;

const Image = styled.img`
  width: 90%;
  border-radius: 50%;
  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    width: 50%;
  }
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.colors.buttonColor};
  outline: none;
  width: 70%;
  overflow-wrap: anywhere;
  border: 1px solid ${(props) => props.theme.colors.buttonBorder};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.buttonText};
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
`;
function UserProfile() {
  const loggedUserQuery = useQuery("loggedUser", () => queries.loggedUser());
  const loggedUser = loggedUserQuery.data?.data || {};
  const history = useHistory();
  const userQuestionQuery = useQuery("userQuestion", () =>
    queries.userQuestionGet()
  );
  const userQuestion = userQuestionQuery.data?.data || [];

  const likeQuestionMutation = useMutation(mutations.likeQuestion, {
    onSuccess: (data) => {
      if (!data.data.dislikes && data.data.like) {
        userQuestion.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newLikes = question.likes;
            newLikes.push(data.data.like);
            return { ...question, Dislikes: newLikes };
          }
          return question;
        });
      } else if (data.data.dislikes && data.data.like) {
        userQuestion.map((question) => {
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
        userQuestion.map((question) => {
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
        userQuestion.map((question) => {
          if (Number(question.id) === Number(data.data.questionId)) {
            const newLikes = question.Dislikes;
            newLikes.push(data.data.Dislikes);
            return { ...question, Dislikes: newLikes };
          }
          return question;
        });
      } else if (data.data.dislikes && data.data.like) {
        userQuestion.map((question) => {
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
        userQuestion.map((question) => {
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

  function showUpdatePage() {
    history.push(`/update`);
  }
  return (
    <div>
      <HeaderLoggedinUser />
      <Wrapper>
        <Container>
          <Image src={`${loggedUser.image}`} />
          <UserInformation>
            <UsernameSmall>@{loggedUser.username}</UsernameSmall>
            <UsernameBig>{loggedUser.username}</UsernameBig>
            <Button onClick={() => showUpdatePage()}>Edit profile</Button>
          </UserInformation>
        </Container>
        <div>
          {userQuestion.map((question) => {
            return (
              question.Answer.length > 0 && (
                <SingleAnsweredQuestion
                  key={question.id}
                  id={question.id}
                  question={question.content}
                  likeCount={question.likes.length}
                  dislikeCount={question.Dislikes.length}
                  likeQuestion={() => handleOnLike(question.id)}
                  dislikeQuestion={() => handleOnDislike(question.id)}
                  answersCount={question.Answer.length}
                  answers={question.Answer}
                  fullWidth={true}
                />
              )
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
}

export default UserProfile;
