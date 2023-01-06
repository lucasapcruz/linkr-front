import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import { LargeLogo } from "../../components/Logo";
import { SignContainer } from "../signIn/signIn";
import { postSignUp } from "../../services/api";

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    image_url: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState(false);
  function handleForm(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSendForm(e) {
    e.preventDefault();
    setIsLoding(true);
    postSignUp(data)
      .then((r) => {
        navigate("/");
      })
      .catch((e) => {
        setIsLoding(false);
        console.log(e);
        if (e.request.status === 409) {
          alert("Email inserido já cadastrado.");
        } else {
          window.alert(
            "Houve um erro no cadastro. Verifique os campos preenchidos."
          );
        }
      });
  }

  return (
    <SignContainer>
      <div className="left">
        <LargeLogo>
          <p>save, share and discover the best links on the web</p>
        </LargeLogo>
      </div>
      <div className="right">
        <Form onSubmit={handleSendForm}>
          <input
            type="email"
            placeholder="e-mail"
            name="email"
            value={data.email}
            onChange={handleForm}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={handleForm}
          />
          <input
            type="text"
            placeholder="name"
            name="name"
            value={data.name}
            onChange={handleForm}
          />
          <input
            type="url"
            placeholder="picture url"
            name="image_url"
            value={data.image_url}
            onChange={handleForm}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </Form>
        <Link to={"/sign-in"}>Switch back to log in</Link>
      </div>
    </SignContainer>
  );
}
