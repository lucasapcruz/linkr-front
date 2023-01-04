import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "../../components/Form";
// import Logo, { StyledLogo } from "../../components/Logo";
import { LargeLogo } from "../../components/Logo";
import { useAuth } from "../../hooks/authContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginSimulation = new Promise((resolve, reject) => {
    if (1 > 0) {
      resolve({
        data: {
          name: "user name",
          token: "1234",
          pictureUrl:
            "https://img.freepik.com/fotos-premium/gatinho-laranja-com-olhos-azuis-isolado_288990-1194.jpg",
        },
      });
    } else {
      reject(422);
    }
  });

  function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    loginSimulation
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser({ ...res.data });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function formHandler(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <SignContainer>
      <div className="left">
        <LargeLogo />
      </div>
      <div className="right">
        <Form onSubmit={formSubmit}>
          <input
            type="text"
            placeholder="e-mail"
            name="email"
            value={form.email}
            onChange={(e) => formHandler(e)}
            maxLength="55"
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={(e) => formHandler(e)}
            disabled={isLoading}
            required
          />
          <button type="submit" disabled={isLoading}>
            Log In
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
