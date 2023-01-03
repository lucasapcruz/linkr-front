import styled from "styled-components";
import Form from "../../components/Form";
// import Logo, { StyledLogo } from "../../components/Logo";
import { LargeLogo } from "../../components/Logo";

export default function SignIn() {
  return (
    <Container>
      <div className="left">
        <LargeLogo />
      </div>
      <div className="right">
        <Form>
          <input type="text" placeholder="e-mail" />
          <input type="text" placeholder="password" />

          <button type="submit">Log In</button>
        </Form>
      </div>
    </Container>
  );
}

const Container = styled.div`
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
  }
`;
