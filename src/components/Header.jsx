import styled from "styled-components";
import { SmallLogo } from "./Logo";
import * as Fa from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <Nav>
      <Link to={"/"}>
        <SmallLogo />
      </Link>
      <div className="user">
        <Fa.FaChevronDown />
        <img
          className="profile-picture"
          src={
            user.pictureUrl ||
            "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
          }
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
  }

  @media (max-width: 768px) {
    .user {
      font-size: 24px;
    }
  }
`;
