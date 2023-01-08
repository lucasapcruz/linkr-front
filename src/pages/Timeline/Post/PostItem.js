import { useEffect, useRef, useState } from "react";
import { deletePost, updatePost } from "../../../services/api";
import PostLink from "./Link/PostLink";
import { PostStyle } from "./PostStyle";
import { RiPencilFill } from 'react-icons/ri';
import { IoTrash } from 'react-icons/io5';
import { IconContext } from "react-icons";
import Modal from 'react-modal';
import { TailSpin } from  'react-loader-spinner'
import HashtagText from "../../../components/HashtagText";
import { useNavigate } from "react-router-dom";

export default function PostItem({data, updateTimeline}) {
  const {id, image_url, name, link, message, owner, user_id} = data;
  const [text, setText] = useState(message);
  const [currMessage, setCurrMessage] = useState(message);
  const [editing, setEditing] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  Modal.setAppElement('#root');

  function toogleEdit() {
    setEditing(editing => {
      if (editing) setText(currMessage);
      return !editing;
    });
  }

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, [editing]);

  function handleText(e) {
    const ref = e.target;
    setText(ref.value);
    ref.style.height = 0;
    ref.style.height = (ref.scrollHeight) + "px";
  }

  function keyPressHandler(e) {
    if (e.key === "Escape") toogleEdit();
    if (e.key === "Enter") {
      e.target.disabled = true;
      setLoading(true);

      updatePost({id, message: text})
      .then(() => {
        setLoading(false);
        setEditing(false);
        setCurrMessage(text);
      })
      .catch(err => {
        setLoading(false);
        e.target.disabled = false;
        window.alert("Não foi possível salvar as alterações.");
        console.log(err);
      });
    }
  }
  
  function toogleModal() {
    setModalIsOpen(state => !state);
  }
  
  function deleteHandler() {
    setDeleteLoading(true);
    deletePost(id)
    .then(() => {
      toogleModal();
      updateTimeline();
    })
    .catch((err) => {
      toogleModal();
      window.alert("Não foi possível excluir o post.");
    })
  }

  function toUserPosts() {
    navigate("/user/" + user_id);
    updateTimeline();
  }

  return (
    <PostStyle>
      {owner && <div className="options">
        <IconContext.Provider value={{ size:"20px" }}>
          <div className="edit" onClick={toogleEdit}><RiPencilFill/></div>
          <div className="delete" onClick={toogleModal}><IoTrash/></div>
        </IconContext.Provider>
      </div>}
      {owner && <Modal 
        isOpen={modalIsOpen}
        className="modal"
        overlayClassName="overlay"
      >
        { deleteLoading 
          ? <TailSpin
              height="80"
              width="80"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          : <>
              <div className="title">Are you sure you want to delete this post?</div>
              <div className="buttons">
                <button className="cancel" onClick={toogleModal}>No, go back</button>
                <button className="ok" onClick={deleteHandler}>Yes, delete it</button>
              </div>
            </>
        }
      </Modal>}
      <img src={image_url} alt="" onClick={toUserPosts}/>
      <div className="content">
        <div className="name" onClick={toUserPosts}>{name}</div>
        {editing 
          ? <textarea type="text" name="editmsg" id="editmsg" maxLength="1000" 
              value={text} onFocus={handleText} onChange={handleText} ref={inputRef}
              onKeyDown={keyPressHandler}
            />
          : <div className="message"><HashtagText>{currMessage}</HashtagText></div>
        }
        {link ? <PostLink data={link}/> : null}
      </div>
    </PostStyle>
  );
}