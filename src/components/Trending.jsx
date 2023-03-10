import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTrendingHashtags } from "../services/api";
import HashtagText from "./HashtagText";

export default function Trending({className, update}) {

  const [hashtags, setHashtags] = useState(null);

  useEffect(() => {
    getTrendingHashtags()
    .then(r => {
      setHashtags(r.data);
    })
    .catch(e => {
      console.log(e);
    });
  }, [update]);

  return (
    <Div className={className}>
      <p className="title">trending</p>
      <HashtagList>
        {hashtags?.map((h, i) => <HashtagText key={i}>{`#${h.name}`}</HashtagText>)}
      </HashtagList>
    </Div>
  );
}

const Div = styled.div`
  background: #171717;
  border-radius: 16px;
  width: 100%;
  height: min-content;

  .title {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 27px;
    padding: 16px;
    border-bottom: 1px solid #484848;
  }
`;

const HashtagList = styled.ul`
  font-size: 19px;
  line-height: 23px;
  padding: 16px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;