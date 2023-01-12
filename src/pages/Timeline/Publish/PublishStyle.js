import styled from "styled-components";
import { PostStyle } from "../Post/PostStyle";

export const PublishStyle = styled(PostStyle)`
  background-color: #fff;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2);

  display: flex;
  padding: 20px;
  gap: 16px;
  border-radius: 16px;
  margin-bottom: 38px;

  * {
    font-weight: 300;
  }

  .content {
    width: 100%;

    .title {
      font-size: 20px;
      color: #707070;
    }

    input,
    textarea {
      resize: none;
      background-color: #efefef;
      border-radius: 5px;
      padding: 8px 16px;
      font-size: 15px;
      border: 0;
    }

    input::placeholder,
    textarea::placeholder {
      color: #949494;
    }

    button {
      align-self: flex-end;
      font-size: 14px;
      font-weight: 700;
      color: white;
      width: 112px;
      height: 31px;
      background-color: #1877f2;
      border-radius: 5px;
    }
  }
`;
