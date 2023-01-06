import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "../../components/Form";
// import Logo, { StyledLogo } from "../../components/Logo";
import { LargeLogo } from "../../components/Logo";
import { useAuth } from "../../hooks/authContext";
import { signIn } from "../../services/api";


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
