import styled from "styled-components";

const Logo = styled.h1`
  font-family: "Passion One";
  font-weight: 700;
  letter-spacing: 0.05em;

  color: #ffffff;

  &::after {
    content: "linkr";
  }
`;

export const LargeLogo = styled(Logo)`
  font-size: 105px;
`;

export const SmallLogo = styled(Logo)`
  font-size: 45px;
`;
