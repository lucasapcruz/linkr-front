import styled from "styled-components";

export const PostStyle = styled.li`
  background-color: darkgreen;
  background-color: #1e1e1e;
  font-family: "Lato", sans-serif;
  border-radius: 16px;

  .repost-text {
    font-weight: 400;
    font-size: 11px;
    padding: 11px;

    display: flex;
    align-items: center;
    gap: 8px;

    .icon {
      font-size: 16px;
    }
  }

  .post-item {
    background-color: #171717;
    display: flex;
    gap: 16px;
    padding: 20px;
    border-radius: 16px;
    position: relative;
  }

  * {
    font-family: "Lato", sans-serif;
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
      color: #b7b7b7;
      margin-bottom: 8px;
      word-break: break-all;
    }

    #editmsg {
      font-size: 14px;
      outline: 0;
      resize: none;
      color: #4c4c4c;
      background-color: white;
      border-radius: 7px;
      overflow: hidden;
      padding: 3px 10px 7px;
    }
  }
`;

export const PostSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .post-action-list,
  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .post-action-list {
    gap: 18px;
  }

  .action {
    gap: 5px;
  }

  img {
    margin-bottom: 18px;
  }

  p {
    font-family: "Lato";
    font-style: normal;
    font-size: 11px;
    text-align: center;
    font-size: 11px;
  }
`;
