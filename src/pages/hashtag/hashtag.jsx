import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext";
import Timeline from "../../components/Timeline";

export default function HashtagPage({state}) {
  const {hashtag} = useParams();
  const [status, setStatus] = useState(true);
  const [update, setUpdate] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState(`# ${hashtag}`);
  const { id } = useParams();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"))?.token;
    if (!isLoggedIn) navigate("/");
    setUpdate(val => !val);
  }, [navigate, hashtag]);
  
  return (
    <>
      <Header setUpdate={setUpdate}/>
      <MainContainer pageTitle={title} setUpdate={setUpdate}>
      <Timeline 
            user={user} 
            navigate={navigate} 
            update={update}
            setTitle={setTitle} 
            id={id} 
            state={state} 
            status={status} 
            setStatus={setStatus}
            publishEnabled={false}
            hashtag={hashtag}
            />
      </MainContainer>
    </>
  );
}
