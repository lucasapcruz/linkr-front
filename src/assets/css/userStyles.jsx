import { createGlobalStyle } from "styled-components";

const UserStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
      /* outline: 1px dashed palevioletred; */
    }
    body {
      font-family: 'Lato', sans-serif;
      background: #262835;
      color: #fff;
      padding-bottom: 80px;
    }
    a {
      text-decoration: none;
 
      
      &:hover{
        cursor: pointer;
      }
    }
    button {
      &:hover{
        cursor: pointer;
      }
    }
    ul {
      list-style: none;
    }
`;

export default UserStyles;
