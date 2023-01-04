import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import HashtagText from "./HashtagText";

export default function Trending() {

  const [hashtags, setHashtags] = useState(null);

  useEffect(() => {
    const token = "one";
    const headers = {Authorization: "Bearer " + token};
    axios.get("http://localhost:5000/hashtags", {headers})
    .then(r => {
      console.log(r.data)
      setHashtags(r.data)
    })
    .catch(e => {
      console.log(e);
      // setStatus("An error occured while trying to fetch the posts, please refresh the page");
    });
  }, []);

  return (
    <Div>
      <p className="title">trending</p>
      <hr />
      <HashtagList>
        {hashtags?.map(h => <HashtagText>{`#${h.name}`}</HashtagText>)}
      </HashtagList>
    </Div>
  );
}

const Div = styled.div`
  background: #171717;
  border-radius: 16px;
  padding: 16px;

  width: 100%;
  height: min-content;

  .title {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 27px;

    line-height: 61px;
  }
`;

const HashtagList = styled.ul`
  font-size: 19px;
  line-height: 23px;
`;