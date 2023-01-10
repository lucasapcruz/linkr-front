import { useAuth } from "../../hooks/authContext";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import Timeline from "../../components/Timeline";
import { useState } from "react";

export default function TimelinePage({ state }) {
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState("timeline");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  return (
    <>
      <Header setUpdate={setUpdate}/>
      <MainContainer pageTitle={title} update={update} setUpdate={setUpdate} >
        <Timeline 
            user={user} 
            navigate={navigate} 
            update={update}
            setTitle={setTitle} 
            id={id} 
            state={state} 
            status={status} 
            setStatus={setStatus}
            publishEnabled={true}
            hashtag={null}
            />
      </MainContainer>
    </>
  );
}