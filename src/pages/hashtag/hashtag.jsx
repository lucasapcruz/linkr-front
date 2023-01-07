import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import PostItem from "../Timeline/Post/PostItem";
import { TimelineStyle } from "../Timeline/TimelineStyle";
import { TailSpin } from 'react-loader-spinner'
import { useEffect, useState } from "react";
import { getPosts } from "../../services/api";

export default function HashtagPage() {
  const {hashtag} = useParams();
  const [posts, setPosts] = useState(null);
  const [status, setStatus] = useState(true);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  function updateTimeline() {
    setUpdate(val => !val);
    window.scrollTo(0, 0);
    setPosts(null);
  }

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"))?.token;
    if (!isLoggedIn) navigate("/");
    updateTimeline()
  }, [navigate, hashtag]);
  
  useEffect(() => {
    getPosts(hashtag)
      .then(r => setPosts(r.data))
      .catch(e => {
        console.log(e);
        setStatus(false);
      });
  }, [update, hashtag]);

  return (
    <>
      <Header updateTimeline={updateTimeline}/>
      <MainContainer pageTitle={`# ${hashtag}`} updateTimeline={updateTimeline}>
        <TimelineStyle>
          <ul>
            {posts
              ? posts.length > 0
                ? posts.map(e => <PostItem key={e.id} data={e} updateTimeline={updateTimeline}/>)
                : <div className="status">There are no posts yet</div>
              : status
                ? <TailSpin
                  height="80"
                  width="80"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{ alignSelf: "center" }}
                  wrapperClass=""
                  visible={true}
                />
                : <div className="status">An error occured while trying to fetch the posts, please refresh the page</div>
            }
          </ul>
        </TimelineStyle>
      </MainContainer>
    </>
  );
}
