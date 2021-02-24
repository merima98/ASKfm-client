import React from "react";
import styled from "styled-components";
import { ThumbsUp, ThumbsDown, MessageSquare } from "react-feather";

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const Container = styled.div`
  background-color: #021d2e;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #12415c;
  display: grid;
`;
const Question = styled.span`
  font-weight: bold;
  overflow-wrap: anywhere;
  padding: 20px;
  color: #fff;
  border-bottom: 1px solid #12415c;
`;
const LikeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 4px;
`;

const StyledThumbsUp = styled(ThumbsUp)`
  color: #12415c;
  height: 16px;
  width: 16px;
  cursor: pointer;
`;

const StyledThumbsDown = styled(ThumbsDown)`
  color: #12415c;
  height: 16px;
  width: 16px;
  cursor: pointer;
`;

const StyledMessageSquare = styled(MessageSquare)`
  color: #12415c;
  height: 16px;
  width: 16px;
  cursor: pointer;
`;
const StyledNumber = styled.span`
  color: #fff;
  font-size: 12px;
`;

function SingleAnsweredQuestion(props) {
  const { question, likeCount, dislikeCount } = props;
  return (
    <Wrapper>
      <Container>
        <Question>{question}</Question>

        <LikeContainer>
          <div>
            <StyledNumber>{likeCount > 0 && likeCount}</StyledNumber>{" "}
            <StyledThumbsUp onClick={props.likeQuestion} />
          </div>{" "}
          <div>
            <StyledNumber>{dislikeCount > 0 && dislikeCount}</StyledNumber>{" "}
            <StyledThumbsDown onClick={props.dislikeQuestion} />
          </div>
          <StyledMessageSquare />
        </LikeContainer>
      </Container>
    </Wrapper>
  );
}

export default SingleAnsweredQuestion;
