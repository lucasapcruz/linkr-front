import styled from "styled-components";
import Trending from "./Trending";

export default function MainContainer({ pageTitle, update, children }) {
  return (
    <>
      <Div>
        <p className="page-title">{pageTitle}</p>
        <div className="children">{children}</div>
        <Trending className="trending" update={update}/>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-auto-rows: auto 1fr;
  column-gap: 25px;
  justify-items: left;

  padding: 125px 0 0;

  .page-title {
    grid-column: 2;
    margin-bottom: 45px;
  }

  .children {
    grid-column: 2;
    width: 100%;
    /* grid-column-start: 2;
    grid-column-end: 3; */
  }

  .trending {
    grid-row: 2;
    grid-column: 3;
  }

  @media (max-width:710px) {
    grid-template-columns: 1fr 2fr 1fr;
    
    .trending {
      display: none;
    }
  }

  @media (max-width:611px) {
    display: unset;

    .page-title{
      margin-top: 107px;
      margin-left: 5vw;
    }

    .trending {
      display: none;
    }
  }
`;
