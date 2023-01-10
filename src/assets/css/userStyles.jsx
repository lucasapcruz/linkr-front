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
      width: 112px;
      height: 31px;

      background-color: #1877F2;
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

    .overlay {
      position: fixed;
      inset: 0px;
      background-color: rgba(255, 255, 255, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 40px;

      background-color: #333333;
      border-radius: 50px;
      width: 597px;
      height: 262px;

      font-weight: 700;
      font-size: 34px;
      line-height: 41px;
      text-align: center;
      padding: 0 129px;

      .buttons {
        display: flex;
        gap: 27px;

        .cancel {
          color: #1877F2;
          background-color: white;
        }
      }

      button {
        font-size: 14px;
        font-weight: 700;
        color: white;
        width: 112px;
        height: 31px;
        background-color: #1877F2;
        border-radius: 5px;
      }
    }
`;

export default UserStyles;
