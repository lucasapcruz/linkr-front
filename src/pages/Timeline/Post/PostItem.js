import PostLink from "./Link/PostLink";
import { PostStyle } from "./PostStyle";

export default function PostItem({data}) {
  const {image_url, name, link, message} = data;

  return (
    <PostStyle>
      <img src={image_url} alt=""/>
      <div className="content">
        <div className="name">{name}</div>
        <div className="message">{message}</div>
        {link ? <PostLink data={link}/> : null}
      </div>
    </PostStyle>
  );
}