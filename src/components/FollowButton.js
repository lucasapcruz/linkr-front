import styled from 'styled-components';

export const FollowButton = styled.button`
  background-color: ${props => props.following ? "white" : "#1877F2"};
  color: ${props => props.following ? "#1877F2" : "white"};
  justify-self: end;

  &:disabled {
    filter: grayscale(100%);
  }
`;