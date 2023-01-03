import axios from "axios";
import { useEffect, useState } from "react";
import PostItem from "./Post/PostItem";
import PublishItem from "./Publish/PublishItem";
import { TimelineStyle } from "./TimelineStyle";

export default function TimelinePage() {
  const [posts, setPosts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState("Loading...");

  function updateTimeline () {
    setUpdate(state => !state);
  }

  useEffect(() => {
    const token = "one";
    const headers = {Authorization: "Bearer " + token};
    axios.get("http://localhost:5000/posts", {headers})
    .then(r => setPosts(r.data))
    .catch(e => {
      console.log(e);
      setStatus("An error occured while trying to fetch the posts, please refresh the page");
    });
  }, [update]);

  return (
    <TimelineStyle>
      <main>
        <h1>timeline</h1>
        <ul>
          <PublishItem image={posts ? posts[0].image_url : null} updateTimeline={updateTimeline}/>
          {posts 
            ? posts.length > 0 
              ? posts.map(e => <PostItem key={e.id} data={e}/>)
              : <div className="status">There are no posts yet</div>
            : <div className="status">{status}</div>
          }
        </ul>
      </main>
    </TimelineStyle>
  );
}