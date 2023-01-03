import styled from "styled-components";
import { SmallLogo } from "./Logo";
import * as Fa from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Nav>
      <Link to={"/"}>
        <SmallLogo />
      </Link>
      <div className="user">
        <Fa.FaChevronDown />
        <img
          src="https://img.freepik.com/fotos-premium/gatinho-laranja-com-olhos-azuis-isolado_288990-1194.jpg"
          alt="foto do usuário"
        />
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  background: #000;

  padding: 10px 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .user {
    font-size: 30px;
    height: 53px;

    display: flex;
    align-items: center;
    gap: 5px;

    img {
      height: 100%;
      aspect-ratio: 1/1;
      border-radius: 100%;
    }
  }

  @media (max-width: 768px) {
    .user {
      font-size: 24px;

      img {
        height: 45px;
      }
    }
  }
`;
