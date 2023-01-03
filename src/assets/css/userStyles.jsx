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
`;

export default UserStyles;
