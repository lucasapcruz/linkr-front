import styled from "styled-components";
import { FollowButton } from "./FollowButton";
import SearchBar from "./SearchBar";
import Trending from "./Trending";

export default function MainContainer({
  pageTitle,
  update,
  setUpdate,
  children,
  following,
  toogleFollowing,
}) {
  return (
    <>
      <Div>
        <div className="searchbar-wrapper">
          <SearchBar className="searchtl" setUpdate={setUpdate} />
        </div>
        <p className="page-title">{pageTitle}</p>

        {following !== undefined && (
          <FollowButton onClick={toogleFollowing} following={following}>
            {following ? "Unfollow" : "Follow"}
          </FollowButton>
        )}
        <div className="children">{children}</div>
        <div className="trending-column">
          <Trending className="trending" update={update} />
        </div>
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

  .trending-column {
    position: relative;

    .trending {
      position: fixed;
      width: 100%;
      box-sizing: border-box;
      width: 301px;
    }

    @media (max-width: 1024px) {
      .trending {
        max-width: 200px;
      }
    }
  }

  .searchbar-wrapper {
    display: none;
  }

  .loader {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader-container {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loader-container p {
    margin-top: 25px;
    margin-bottom: 50px;
    color: #6d6d6d;
  }

  .loader {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader-container {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loader-container p {
    margin-top: 25px;
    margin-bottom: 50px;
    color: #6d6d6d;
  }

  @media (max-width: 710px) {
    grid-template-columns: 1fr 1fr 2fr 1fr;

    .trending {
      display: none;
    }
  }

  @media (max-width: 611px) {
    display: unset;

    .searchbar-wrapper {
      margin-top: 84px;
      margin-bottom: 30px;
      display: block;
      width: 100%;
      padding: 0 16px;

      .searchtl {
        width: 100%;

        .result {
          position: initial;
          margin-top: -20px;
        }
      }
    }

    .page-title {
      margin-left: 5vw;
    }

    .trending {
      display: none;
    }
  }
`;
