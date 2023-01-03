import { createGlobalStyle } from "styled-components";

const UserStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
      /* outline: 1px dashed palevioletred; */
    }

    body {
      font-family: 'Lato', sans-serif;
      background: #333333;
      color: #fff;

      max-width: 100vw;

      padding: 125px 0 0;
    }

    a {
      text-decoration: none;   
      &:hover{
        cursor: pointer;
        filter: brightness(0.8);
      }
    }

    button {
      border: none;
      width: 112px;
      height: 31px;

      background: #1877F2;
      border-radius: 5px;
      text-align: center;

      color: #ffffff;
      font-family: "Lato";
      font-weight: 700;
      font-size: 14px;

      &:hover{
        cursor: pointer;
        filter: brightness(0.8);
      }
    }

    input {
      border: none;
      outline: none;
    }

    ul {
      list-style: none;
    }

    .hashtag{
      font-family: 'Lato';
      font-weight: 700;
      font-size: 19px;
    }

    .profile-picture {
      aspect-ratio: 1/1;
      border-radius: 50%;

      width: 50px;
    }

    .page-title {
      font-family: 'Oswald';
      font-style: normal;
      font-weight: 700;
      font-size: 43px;
    }

    @media (max-width: 768px){
       .profile-picture {
      width: 40px;
    }
    }
`;

export default UserStyles;
