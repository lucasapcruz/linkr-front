import { FiSend } from "react-icons/fi";
import styled from "styled-components";

export default function PostComment({data}){
    const { id, image_url, name, link, message, owner, user_id, shareinfo } =
    data

    return(
        <Comment>
          <img src={image_url} alt=""/>
          <div className="conteiner-comment">
            <p className="name">Joãozinho - following</p>
            <div className="comment">
                <p className="message"> ACHEI UM PORRE </p>
            </div>               
          </div>
        </Comment>
    )
}

const Comment = styled.div`
    border-bottom: 1px solid #353535;
    padding: 10px;
    /* background-color: green; */
    margin: 10px;
    display: flex;

    .conteiner-comment{
        /* background-color: aqua; */
        margin-left: 10px;
        width: 85%;
        .name{
            color: #F3F3F3;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .comment{
            /* background-color: red; */
            width: 70%;
            .message{
                color: #ACACAC;
                font-weight: 400;
            }
        }
    }
    
`