import { useAuth } from "../../hooks/authContext";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import Timeline from "../../components/Timeline";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
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

  const [postsPage, setPostsPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    setUpdate(v => !v);
  }, [id]);

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

  async function fecthPosts() {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return navigate("/");

    const refGetPosts = (state === "user") ? getPostsUser(id, postsPage, null) : getPosts(postsPage, null);
    setTitle(state ? "" : "timeline");

    refGetPosts
      .then((r) => {
        if (r.data.posts.length < 10) {
          setHasMoreItems(false)
        } else {
          setPostsPage(postsPage+1)
        }
        if (!posts) {
          setPosts([...r.data.posts]);
        } else {
          setPosts([...posts, ...r.data.posts]);
        }

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
  }

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

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
        <InfiniteScroll
          loadMore={fecthPosts}
          hasMore={hasMoreItems}
          loader={loader}>
          <Timeline
            user={user}
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
            setPostsPage={setPostsPage}
            setHasMoreItems={setHasMoreItems}
          />
        </InfiniteScroll>
      </MainContainer>
    </>
  );
}
