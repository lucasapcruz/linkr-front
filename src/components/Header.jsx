import styled from "styled-components";
import { useAuth } from "../hooks/authContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SmallLogo } from "./Logo";
import * as Fa from "react-icons/fa";
import { logOut } from "../services/api";
import SearchBar from "./SearchBar";

export default function Header({updateTimeline}) {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const [dropDown, setDropDown] = useState(false);

  function logOutHandler() {
    logOut()
      .then((res) => {
        localStorage.clear();
        setUser({
          token: undefined,
          name: undefined,
          pictureUrl: undefined,
        });
        navigate("/sign-in");
      })
      .catch((res) => {
        console.log(res.response.data);
      });
  }

  return (
    <Nav>
      <Link to={"/"}>
        <SmallLogo />
      </Link>

      <SearchBar className="searchnav" updateTimeline={updateTimeline}/>
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
  box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.2);

  width: 100vw;
  height: 72px;
  background-color: #151515;
  box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.2);

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
    cursor: pointer;
  }

  img {
    object-fit: cover;
  }

  @media (max-width: 611px) {
    .searchnav {
      display: none;
    }

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
