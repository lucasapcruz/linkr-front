import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext";
import { getPosts, getPostsUser } from "../../services/api";
import PostItem from "./Post/PostItem";
import PublishItem from "./Publish/PublishItem";
import { TimelineStyle } from "./TimelineStyle";
import { TailSpin } from 'react-loader-spinner'
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useNavigate, useParams } from "react-router-dom";

export default function TimelinePage({state}) {
  const [posts, setPosts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState("timeline");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  function updateTimeline() {
    setUpdate(val => !val);
    window.scrollTo(0, 0);
    setPosts(null);
  }

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"))?.token;
    if (!isLoggedIn) navigate("/");

    const refPosts = (state === "user") ? getPostsUser(id) : getPosts();
    if (state) setTitle("");
    
    refPosts
    .then(r => {
      setPosts(r.data);
      if (state) setTitle(r.data[0].name.split(" ")[0] + "'s posts");
    })
    .catch(e => {
      console.log(e);
      setStatus(false);
    });
  }, [navigate, update, id, state]);

  return (
    <>
      <Header updateTimeline={updateTimeline}/>
      <MainContainer pageTitle={title} update={update} updateTimeline={updateTimeline}>
        <TimelineStyle>
          <ul>
            {!state ? <PublishItem image={user.pictureUrl} updateTimeline={updateTimeline} /> : null}
            {posts
              ? posts.length > 0
                ? posts.map(e => <PostItem key={e.id} data={e} updateTimeline={updateTimeline} />)
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