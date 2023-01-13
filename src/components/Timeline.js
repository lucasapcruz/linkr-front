import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { TimelineStyle } from "../pages/Timeline/TimelineStyle";
import PostItem from "../pages/Timeline/Post/PostItem";
import PublishItem from "../pages/Timeline/Publish/PublishItem";
import NewPostsButton from "./NewPostsButton";

export default function Timeline({
  user,
  update,
  state,
  status,
  publishEnabled,
  posts,
  setPosts,
  setPostsPage,
  setHasMoreItems,
  newPosts,
  clickHandler
}) {
  function updateTimeline() {
    window.scrollTo(0, 0);
    setPosts(null);
    setPostsPage(1);
    setHasMoreItems(true);
  }

  useEffect(() => {
    updateTimeline();
    // eslint-disable-next-line
  }, [update]);

  return (
    <>
      <TimelineStyle>
        <ul>
          {publishEnabled ? (
            !state ? (
              <><PublishItem
                image={user.pictureUrl}
                updateTimeline={updateTimeline} />
                {newPosts ? newPosts.length > 0 ? <NewPostsButton nrNewPosts={newPosts.length} onCLick={clickHandler} /> : null : null} </>
            ) : null
          ) : null}
          {posts ? (
            posts.length > 0 ? (
              posts.map((e) => (
                <PostItem
                  key={e.id}
                  data={e}
                  userName={user.name}
                  updateTimeline={updateTimeline}
                />
              ))
            ) : (
              <div className="status">
                {state
                  ? "This user don't have posts yet."
                  : user.following ? "No posts found from your friends"
                    : "You don't follow anyone yet. Search for new friends!"}
              </div>
            )
          ) : status ? (
            <TailSpin
              height="80"
              width="80"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{ alignSelf: "center" }}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <div className="status">
              An error occured while trying to fetch the posts, please refresh
              the page
            </div>
          )}
        </ul>
      </TimelineStyle>
    </>
  );
}
