import { FiSend } from "react-icons/fi";
import styled from "styled-components";
import { useAuth } from "../../../../hooks/authContext";


export default function PostAuthor(){

    const { user } = useAuth()

    return(
        <Comment>
          <img src={user.pictureUrl} alt=""/>
          <div className="conteiner-comment">
            <div className="comment">
                <input className="message"
                    type="text"
                    placeholder="Write something..."
                    name="message"
                    autoComplete="off"
                    required
                />
                <FiSend />
            </div>               
          </div>
        </Comment>
    )
}

const Comment = styled.div`
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
;
        }
        .comment{
            /* background-color: green; */
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            .message{
                color: #ACACAC;
                font-weight: 400;
                width: 90%;
                height: 40px;
                background-color: #252525;
            }
        }
    }
    
`