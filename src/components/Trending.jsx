import styled from "styled-components";

export default function Trending() {
  return (
    <Div>
      <p className="title">trending</p>
      <hr />
      <HashtagList>
        <li className="hashtag">#react</li>
      </HashtagList>
    </Div>
  );
}

const Div = styled.div`
  height: 406px;

  background: #171717;
  border-radius: 16px;
  padding: 16px;

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
