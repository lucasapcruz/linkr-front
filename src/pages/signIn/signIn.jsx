import { Link } from "react-router-dom";
import styled from "styled-components";
import Form from "../../components/Form";
// import Logo, { StyledLogo } from "../../components/Logo";
import { LargeLogo } from "../../components/Logo";

export default function SignIn() {
  return (
    <SignContainer>
      <div className="left">
        <LargeLogo />
      </div>
      <div className="right">
        <Form>
          <input type="text" placeholder="e-mail" />
          <input type="password" placeholder="password" />
          <button type="submit">Log In</button>
        </Form>
        <Link to={"/sign-up"}>First time? Create an account!</Link>
      </div>
    </SignContainer>
  );
}

export const SignContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  & > * {
    display: flex;
    align-items: center;
  }

  .left {
    background: #000;
    height: 100%;
    padding-left: 144px;
  }

  .right {
    width: 100%;
    padding: 55px;

    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  a {
    font-family: "Lato";
    font-weight: 400;
    font-size: 20px;

    text-decoration-line: underline;

    color: #ffffff;
  }
`;
