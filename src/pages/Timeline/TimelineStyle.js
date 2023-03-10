import styled from 'styled-components';

export const TimelineStyle = styled.div`
  display: flex;
  justify-content: center;
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
    
    width: 100%;
    margin-bottom: 75px;
  }

  .status {
    color: white;
    font-size: 64px;
    text-align: center;
  }

  .loader{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width:611px) {    
    main, ul, li, a {
      width: 100%;
    }

    ul{
      gap:4vw;
    }

    li {
      border-radius: 0;
    }

    li img {
      width: 40px;
      height: 40px;
    }

    h1 {
      margin-left: 20px;
      margin-top: 111px;
      margin-bottom: 35px;
    }

    .publish {
      text-align: center;
      padding: 15px;

      img {
        display: none;
      }

      .content {
        gap: 8px;
        .title {
          margin-bottom: 10px;
        }
      }
    }

    .loader{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      line-height: 18px;
      gap: 4px;

      .name {
        font-size: 17px;
      }
  
      .message {
        font-size: 15px;
      }
    }

    a {
      padding: 10px;
    }

    .preview-content {
      width: 66%;
      gap: 4px;
    }

    .preview-img {
      width: 33%;
    }

    .preview-content .title {
      font-size: 11px;
    }

    .preview-content * {
      font-size: 9px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .desc {
      -webkit-line-clamp: 4;
              line-clamp: 4; 
    }

    .url {
      line-height: initial;
      -webkit-line-clamp: 2;
              line-clamp: 2; 
    }

  }
`;
