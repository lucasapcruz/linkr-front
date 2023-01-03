import styled from "styled-components";

export default function Form(props) {
  return <StyledForm {...props}>{props.children}</StyledForm>;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;

  * {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 27px;
    color: #9f9f9f;
  }

  input {
    width: 100%;
    height: 65px;

    padding-left: 17px;

    background: #ffffff;
    border-radius: 6px;

    color: #000;

    &:focus {
      outline: 1px solid red;
    }
  }

  button {
    width: 100%;
    height: 65px;

    background: #1877f2;
    border-radius: 6px;

    color: #ffffff;

    text-align: center;
  }
`;
