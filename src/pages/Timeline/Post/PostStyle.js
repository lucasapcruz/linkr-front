import styled from 'styled-components';

export const PostStyle = styled.li`
  font-family: 'Lato', sans-serif;
  background-color: #171717;
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;

  * {
    font-family: 'Lato', sans-serif;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .name {
      font-size: 19px;
      color: white;
    }

    .message {
      font-size: 17px;
      color: #B7B7B7;
      margin-bottom: 8px;
    }
  }
  
`;