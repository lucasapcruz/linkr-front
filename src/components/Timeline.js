import { useEffect, useState } from "react";
import { TailSpin } from 'react-loader-spinner'
import InfiniteScroll from "react-infinite-scroller";
import { getPosts, getPostsUser } from "../services/api";
import { TimelineStyle } from "../pages/Timeline/TimelineStyle";
import PostItem from "../pages/Timeline/Post/PostItem";
import PublishItem from "../pages/Timeline/Publish/PublishItem";

export default function Timeline({ user, navigate, update, setTitle, id, state, status, setStatus, publishEnabled, hashtag }) {
  const [posts, setPosts] = useState(null);
  const [processUpdate, setProcessUpdate] = useState(false)

  function updateTimeline() {
    window.scrollTo(0, 0);
    setPosts(null);
    setProcessUpdate(val => !val)
  }

  useEffect(() => {
    updateTimeline()
  }, [update])

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"))?.token;
    if (!isLoggedIn) navigate("/");

    if(!hashtag){
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
    }else{
        getPosts(hashtag)
        .then(r => setPosts(r.data))
        .catch(e => {
        console.log(e);
        setStatus(false);
      });
    }

  }, [navigate, processUpdate, id, state, hashtag]);

  return (
    <>
        <TimelineStyle>
          <ul>
              {publishEnabled? !state ? <PublishItem image={user.pictureUrl} updateTimeline={updateTimeline} /> : null : null}
              {posts
                ? posts.length > 0
                  ? posts.map(e => <PostItem key={e.id} data={e} userName={user.name} updateTimeline={updateTimeline} />)
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
    </>
  );
}