import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  padding-bottom: 0.25rem;
  width: 100%;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.color};
  margin-bottom: 0.5rem;
`;

function FormControl(props) {
  const { label = "", children } = props;
  return (
    <div>
      {label && <Label>{label}</Label>}
      {React.cloneElement(children)}
    </div>
  );
}

export default FormControl;
