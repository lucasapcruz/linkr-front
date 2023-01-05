import styled from "styled-components";

const Logo = styled.div`
  font-family: "Passion One";
  font-weight: 700;
  letter-spacing: 0.05em;

  color: #ffffff;

  &::before {
    content: "linkr";
  }

  p {
    max-width: 600px;

    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
  }
`;

export const LargeLogo = styled(Logo)`
  font-size: 105px;
`;

export const SmallLogo = styled(Logo)`
  font-size: 45px;
`;
