import { useAuth } from "../../hooks/authContext";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import Timeline from "../../components/Timeline";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { followUser, getPosts, getPostsUser } from "../../services/api";
import useInterval from "use-interval";
import { TailSpin } from "react-loader-spinner";

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
  const [newPosts, setNewPosts] = useState([]);

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
          setPostsPage(postsPage + 1)
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

  useInterval(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return navigate("/");

    let refGetPosts

    if(posts){
      if (state !== "user") {
        refGetPosts = getPosts(1, null);
      }
  
      refGetPosts
        .then((r) => {
          const incomingPosts = r.data.posts
          const incomingPostsIds = incomingPosts.map(e => e.id)
          const postsId = posts.map( e => e.id)
          console.log("incoming", incomingPostsIds)
          console.log("posts", postsId)
          const updatedPostsIds = []
          incomingPostsIds.forEach((e) => {
            if(!(postsId.includes(e))){
              updatedPostsIds.push(e)
            }
          });
          const updatedPosts = incomingPosts.filter( e => {
            if(incomingPostsIds.includes(e.id)){
              return e
            }
          })
          console.log(updatedPosts)
          setNewPosts(updatedPosts)
        })
        .catch((e) => {
          console.log(e);
          setStatus(false);
        });
    }
  }, 15000)

  function clickHandler() {
    const mergedPosts = posts
    mergedPosts.unshift(...newPosts)
    setPosts(mergedPosts)
    setNewPosts([])
  }

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  const miniLoader = (
    <div className={"loader"}>
      <div className={"loader-container"}>
      <TailSpin
        height="40"
        width="40"
        color="#6D6D6D"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{ alignSelf: "center" }}
        wrapperClass=""
        visible={true}
      />
      <p key="loader" className="loader">
        Loading more posts...
      </p>
      </div>
    </div>
  )

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
          loader={miniLoader}>
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
            newPosts={newPosts}
            clickHandler={clickHandler}
          />
        </InfiniteScroll>
      </MainContainer>
    </>
  );
}