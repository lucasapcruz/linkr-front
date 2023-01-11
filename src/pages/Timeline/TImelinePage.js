import { useAuth } from "../../hooks/authContext";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import Timeline from "../../components/Timeline";
import { useEffect, useState } from "react";

import { followUser, getPosts, getPostsUser } from "../../services/api";

export default function TimelinePage({ state }) {
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState(true);
  const [posts, setPosts] = useState(null);
  const [title, setTitle] = useState("");
  const [following, setFollowing] = useState();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const refGetPosts = state === "user" ? getPostsUser(id) : getPosts();
    setTitle(state ? "" : "timeline");

    refGetPosts
      .then((r) => {
        setPosts(r.data.posts);
        console.log(r.data);
        if (state) {
          setTitle(r.data.name.split(" ")[0] + "'s posts");
          setFollowing(r.data.following);
        } else {
          setUser((u) => ({ ...u, following: r.data.localFollowing }));
        }
      })
      .catch((e) => {
        console.log(e);
        setStatus(false);
      });
  }, [id, state, setUser]);

  function toogleFollowing(e) {
    e.target.disabled = true;
    followUser(id)
      .then((r) => {
        e.target.disabled = false;
        setFollowing((v) => !v);
      })
      .catch((err) => {
        console.log(err);
        e.target.disabled = false;
        window.alert("Não foi possível executar a operação");
      });
  }

  return (
    <>
      <Header setUpdate={setUpdate} />
      <MainContainer
        pageTitle={title}
        update={update}
        setUpdate={setUpdate}
        state={state}
        following={following}
        toogleFollowing={toogleFollowing}
      >
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
          posts={posts}
          setPosts={setPosts}
        />
      </MainContainer>
    </>
  );
}
