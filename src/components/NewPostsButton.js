import styled from "styled-components";

export default function NewPostsButton({ nrNewPosts, onCLick }) {
    return (
        <StyledButton onClick={onCLick}>
            {`${nrNewPosts} new posts, load more!`}
        </StyledButton>
    )
}

const StyledButton = styled.button`
      align-self: flex-end;
      font-size: 14px;
      font-weight: 700;
      color: white;
      width: 100%;
      height: 61px;
      background-color: #1877f2;
      border-radius: 16px;
      box-shadow: 0px 2px 2px 2px rgb(0 0 0 / 20%);
`