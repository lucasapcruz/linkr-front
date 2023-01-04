import { useEffect, useRef, useState } from "react";
import { updatePost } from "../../../services/api";
import PostLink from "./Link/PostLink";
import { PostStyle } from "./PostStyle";
import { RiPencilFill } from 'react-icons/ri';
import { IconContext } from "react-icons";

export default function PostItem({data}) {
  const {id, image_url, name, link, message, owner} = data;
  const [text, setText] = useState(message);
  const [currMessage, setCurrMessage] = useState(message);
  const [editing, setEditing] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

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

  return (
    <PostStyle>
      {owner && <div className="options">
        <IconContext.Provider value={{ size:"20px" }}>
          <div className="edit" onClick={toogleEdit}><RiPencilFill/></div>
        </IconContext.Provider>
      </div>}
      <img src={image_url} alt=""/>
      <div className="content">
        <div className="name">{name}</div>
        {editing 
          ? <textarea type="text" name="editmsg" id="editmsg" maxLength="1000" 
              value={text} onFocus={handleText} onChange={handleText} ref={inputRef}
              onKeyDown={keyPressHandler}
            />
          : <div className="message">{currMessage}</div>
        }
        {link ? <PostLink data={link}/> : null}
      </div>
    </PostStyle>
  );
}