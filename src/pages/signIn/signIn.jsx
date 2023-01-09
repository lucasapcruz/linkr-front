import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "../../components/Form";
// import Logo, { StyledLogo } from "../../components/Logo";
import { LargeLogo } from "../../components/Logo";
import { useAuth } from "../../hooks/authContext";
import { signIn, updateUser } from "../../services/api";


export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function formHandler(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    signIn(form)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser({ ...res.data });
        navigate("/timeline");
        updateUser();
      })
      .catch((err) => {
        console.log(err);
        window.alert("Houve um erro no login. Verifique seu email e senha.");
        setIsLoading(false);
      });
    
  }

  return (
    <SignContainer>
      <div className="left">
        <LargeLogo />
        <p className="slogan">save, share and discover the best links on the web</p>
      </div>
      <div className="right">
        <Form onSubmit={formSubmit}>
          <input
            type="email"
            placeholder="e-mail"
            name="email"
            value={form.email}
            onChange={formHandler}
            maxLength="55"
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={formHandler}
            disabled={isLoading}
            required
          />
          <button type="submit" disabled={isLoading}>
            {
              isLoading ? "Logging in..." : "Log in"
            }
          </button>
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
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }

  .right {
    width: 100%;
    padding: 55px;

    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  a {
    font-family: "Lato";
    font-weight: 400;
    font-size: 20px;

    text-decoration-line: underline;

    color: #ffffff;
  }

  .slogan{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    width: 442px;
  }

  @media (max-width:710px) {
    display: block;

    .left{
      padding-left: unset;
      flex-direction: column;
      box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.2);
      flex-direction: line;
      justify-content: unset;
      align-items: center;
    }

    .right{
     padding: 12vw 5vw 0vw 5vw;
    }

    .slogan{
      display: block;
      font-family: 'Oswald';
      font-style: normal;
      font-weight: 700;
      font-size: 23px;
      line-height: 34px;
      width: 237px;
      margin: 0px auto;
      margin-bottom: 29px;
  }
  }
`;
