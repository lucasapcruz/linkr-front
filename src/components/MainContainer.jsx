import styled from "styled-components";
import Trending from "./Trending";

export default function MainContainer({ pageTitle, children }) {
  return (
    <>
      <Div>
        <p className="page-title">{pageTitle}</p>
        <div className="children">{children}</div>
        <Trending className="trending" />
      </Div>
    </>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto 1fr;
  column-gap: 25px;
  justify-items: left;

  padding: 125px 0 0;

  .page-title {
    grid-column: 2;
    margin-bottom: 45px;
  }

  .children {
    grid-column-start: 2;
    grid-column-end: 4;
  }

  .trending {
    grid-row: 2;
    grid-column: 4;
  }
`;