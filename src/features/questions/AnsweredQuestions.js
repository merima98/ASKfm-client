import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import HeaderLoggedinUser from "../header/HeaderLoggedinUser";
import { BREAKPOINTS } from "../../constants";

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

  @media (min-width: ${BREAKPOINTS.SMALL_DEVICES}) {
    border-right: 1px solid #12415c;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 14px;
    text-align: center;
    position: static;
    top: 0;
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
const RightSideContainer = styled.div``;

function AnsweredQuestions() {
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
        <RightSideContainer>
          <HeaderLoggedinUser />
          <div>mersiha</div>
        </RightSideContainer>
      </Container>
    </div>
  );
}

export default AnsweredQuestions;
