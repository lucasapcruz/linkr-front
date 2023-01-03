import styled from 'styled-components';

export const TimelineStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  background-color: #333333;

  h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    color: white;
    margin-top: 150px;
    margin-bottom: 43px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 32px;
    
    width: 611px;
    margin-bottom: 75px;
  }

  .status {
    color: white;
    font-size: 64px;
  }
`;