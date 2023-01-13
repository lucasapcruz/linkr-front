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
  const { id } = useParams();
  const [postsPage, setPostsPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    fecthPosts()
  }, [hashtag]);

  async function fecthPosts(){
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
    setUpdate(val => !val);
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
        </InfiniteScroll>
      </MainContainer>
    </>
  );
}
