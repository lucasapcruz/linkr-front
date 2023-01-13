import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext";
import Timeline from "../../components/Timeline";
import { getPosts } from "../../services/api";
import InfiniteScroll from "react-infinite-scroller";

export default function HashtagPage() {
  const { hashtag } = useParams();
  const [status, setStatus] = useState(true);
  const [update, setUpdate] = useState(false);
  const [posts, setPosts] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState(`# ${hashtag}`);

  const [postsPage, setPostsPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    setUpdate(v => !v);
  }, [hashtag]);

  async function fecthPosts(){
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return navigate("/");

    getPosts(postsPage, hashtag)
      .then(r => {
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
      })
      .catch(e => {
        console.log(e);
        setStatus(false);
      });

    setTitle(`# ${hashtag}`);
  }

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  return (
    <>
      <Header setUpdate={setUpdate} />
      <MainContainer pageTitle={title} setUpdate={setUpdate}>
        <InfiniteScroll
          loadMore={fecthPosts}
          hasMore={hasMoreItems}
          loader={loader}>
          <Timeline
            user={user}
            update={update}
            setTitle={setTitle}
            status={status}
            setStatus={setStatus}
            publishEnabled={false}
            hashtag={hashtag}
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
