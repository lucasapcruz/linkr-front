import styled from "styled-components";
import Trending from "./Trending";

export default function MainContainer({ children }) {
  return (
    <>
      <Div>
        <div className="children">{children}</div>
        <Trending className="trending" />
      </Div>
    </>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;

  .children {
    grid-column-start: 2;
    grid-column-end: 4;
  }
`;
