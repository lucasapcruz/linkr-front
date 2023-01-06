import styled from "styled-components";
import { useAuth } from "../hooks/authContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SmallLogo } from "./Logo";
import * as Fa from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const [dropDown, setDropDown] = useState(false);

  function logOutHandler() {
    localStorage.clear();
    setUser({
      token: undefined,
      name: undefined,
      pictureUrl: undefined,
    });
    navigate("/");
  }

  return (
    <Nav>
      <Link to={"/"}>
        <SmallLogo />
      </Link>
      <div className="user" onClick={() => setDropDown(!dropDown)}>
        {dropDown ? <Fa.FaChevronUp /> : <Fa.FaChevronDown />}

        <img
          className="profile-picture"
          src={
            user.pictureUrl ||
            "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
          }
          alt="foto do usuário"
        />
        <DropDown dropDown={dropDown} onClick={() => logOutHandler()}>
          Logout
        </DropDown>
      </div>
      <Overlay dropDown={dropDown} onClick={() => setDropDown(false)} />
    </Nav>
  );
}

const Nav = styled.nav`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 72px;
  background: #000;

  padding: 10px 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  * {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }

  .user {
    font-size: 30px;
    height: 53px;

    display: flex;
    align-items: center;
    gap: 5px;

    position: relative;

    transition: all 200ms ease;
  }

  svg {
    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    .user {
      font-size: 24px;
    }
  }
`;

const DropDown = styled.div`
  position: absolute;
  left: 0;
  top: 60px;
  z-index: 3;

  display: flex;
  visibility: ${(props) => (props.dropDown ? "visible" : "hidden")};
  opacity: ${(props) => (props.dropDown ? "1" : "0")};

  justify-content: center;
  justify-items: center;

  padding: 15px 15px 20px;

  width: 100%;
  border-radius: 0 0 20px 20px;
  background-color: #000;

  font-weight: 700;
  font-size: 17px;

  transition: all 200ms ease;

  &:hover {
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  display: ${(props) => (props.dropDown ? "block" : "none")};
`;
