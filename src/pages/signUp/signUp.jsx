import { Link } from "react-router-dom";
import Form from "../../components/Form";
import { LargeLogo } from "../../components/Logo";
import { SignContainer } from "../signIn/signIn";

export default function SignUp() {
  return (
    <SignContainer>
      <div className="left">
        <LargeLogo>
          <p>save, share and discover the best links on the web</p>
        </LargeLogo>
      </div>
      <div className="right">
        <Form>
          <input type="text" placeholder="e-mail" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="username" />
          <input type="text" placeholder="picture url" />

          <button type="submit">Log In</button>
        </Form>
        <Link to={"/sign-in"}>Switch back to log in</Link>
      </div>
    </SignContainer>
  );
}
