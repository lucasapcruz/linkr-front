import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/authContext";
import { getPosts } from "../../services/api";
import PostItem from "./Post/PostItem";
import PublishItem from "./Publish/PublishItem";
import { TimelineStyle } from "./TimelineStyle";
import { TailSpin } from  'react-loader-spinner'
import Header from "../../components/Header";

export default function TimelinePage() {
  const [posts, setPosts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState(true);
  const { user } = useAuth();

  function updateTimeline () {
    setUpdate(state => !state);
    setPosts(null);
  }

  useEffect(() => {
    getPosts()
    .then(r => setPosts(r.data))
    .catch(e => {
      console.log(e);
      setStatus(false);
    });
  }, [update]);

  return (
    <TimelineStyle>
      <Header/>
      <main>
        <h1>timeline</h1>
        <ul>
          <PublishItem image={user.pictureUrl} updateTimeline={updateTimeline}/>
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
                  wrapperStyle={{alignSelf: "center"}}
                  wrapperClass=""
                  visible={true}
                /> 
              : <div className="status">An error occured while trying to fetch the posts, please refresh the page</div>
          }
        </ul>
      </main>
    </TimelineStyle>
  );
}