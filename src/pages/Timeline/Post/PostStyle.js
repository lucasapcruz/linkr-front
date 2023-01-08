import styled from 'styled-components';

export const PostStyle = styled.li`
  font-family: 'Lato', sans-serif;
  background-color: #171717;
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  position: relative;

  * {
    font-family: 'Lato', sans-serif;
  }

  .options {
    position: absolute;
    top: 20px;
    right: 20px;

    display: flex;
    gap: 8px;
    
    * {
      cursor: pointer;
    }
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    .name {
      font-size: 19px;
      color: white;
      cursor: pointer;
      width: fit-content;
    }

    .message {
      font-size: 17px;
      color: #B7B7B7;
      margin-bottom: 8px;
      word-break: break-all;
    }

    #editmsg {
      font-size: 14px;
      outline: 0;
      resize: none;
      color: #4C4C4C;
      background-color: white;
      border-radius: 7px;
      overflow: hidden;
      padding: 3px 10px 7px;
    }
  }
  
`;

export const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 10px;
  }
  h3 {
    margin-top: 3px;
    font-size: 10px;
  }
`