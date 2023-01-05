import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import { LargeLogo } from "../../components/Logo";
import { SignContainer } from "../signIn/signIn";
import { postSignUp } from "../../services/api";

export default function SignUp() {

  const [data, setData] = useState({name: '', email: '', password: '', image_url: ''})
  const navigate = useNavigate()  

  function handleForm(e){
    const { name, value } = e.target
    setData({...data, [name]:value})
  }

  function handleSendForm(e){
    e.preventDefault()
     postSignUp(data)
      .then(r => {
        navigate('/sign-in')
      })
      .catch(e => {
        console.log(e);
        window.alert("Houve um erro no cadastro. Verifique os campos preenchidos.");
      })
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
          <input type="email" placeholder="e-mail" name="email" value={data.email} onChange={handleForm} />
          <input type="password" placeholder="password" name="password" value={data.password} onChange={handleForm}/>
          <input type="text" placeholder="name" name="name" value={data.name} onChange={handleForm}/>
          <input type="url" placeholder="picture url" name="image_url" value={data.image_url} onChange={handleForm}/>

          <button type="submit">Log In</button>
        </Form>
        <Link to={"/sign-in"}>Switch back to log in</Link>
      </div>
    </SignContainer>
  );
}
