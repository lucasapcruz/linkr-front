import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext";
import Timeline from "../../components/Timeline";
import { getPosts } from "../../services/api";

export default function HashtagPage() {
  const {hashtag} = useParams();
  const [status, setStatus] = useState(true);
  const [update, setUpdate] = useState(false);
  const [posts, setPosts] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState(`# ${hashtag}`);
  const { id } = useParams();

  useEffect(() => {
    getPosts(hashtag)
    .then(r => setPosts(r.data.posts))
    .catch(e => {
      console.log(e);
      setStatus(false);
    });

    setTitle(`# ${hashtag}`);
    setUpdate(val => !val);
  }, [hashtag]);
  
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
            status={status} 
            setStatus={setStatus}
            publishEnabled={false}
            hashtag={hashtag}
            posts={posts}
            setPosts={setPosts}
            />
      </MainContainer>
    </>
  );
}
