import styled from "styled-components";
import ReactHashtag from "react-hashtag";
import { useNavigate } from "react-router-dom";

export default function HashtagText(props) {

    const navigate = useNavigate();

    function getHashtagValue(hashtag) {
        const hashtagValue = hashtag.replace("#", "");
        return hashtagValue;
    }

    function toHashtagPosts(hashtag) {
        navigate("/hashtag/" + getHashtagValue(hashtag));
    }

    return (
        <ReactHashtag renderHashtag={hashtag => (
            <StyledHashtag onClick={() => toHashtagPosts(hashtag)}>
                {hashtag}
            </StyledHashtag>
        )}>
            {props.children}
        </ReactHashtag>
    )
}

const StyledHashtag = styled.span`
  cursor: pointer;
  color: white;
  font-weight: bold;
  width: fit-content;
`