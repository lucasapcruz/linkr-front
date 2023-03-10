import { useEffect, useRef, useState } from "react";
import {
  deletePost,
  postLike,
  getLikes,
  updatePost,
  repost,
  getComments,
  getCommentsId,
} from "../../../services/api";
import PostLink from "./Link/PostLink";
import { PostSidebar, PostStyle } from "./PostStyle";
import PostComment from "./Comment/PostComment";
import PostAuthor from "./Comment/PostAuthor";

import { RiPencilFill } from "react-icons/ri";
import { IoTrash } from "react-icons/io5";
import { IconContext } from "react-icons";
import * as Fa from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";

import Modal from "react-modal";
import { TailSpin } from "react-loader-spinner";
import HashtagText from "../../../components/HashtagText";
import { BsFillHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/authContext";

export default function PostItem({ data, updateTimeline, userName }) {
  const { id, image_url, name, link, message, owner, user_id, shareinfo } =
    data;
  const { sharerName, sharerId, shareCount } = shareinfo;
  const { user } = useAuth();

  const [text, setText] = useState(message);
  const [currMessage, setCurrMessage] = useState(message);
  const [editing, setEditing] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [likesCounter, setLikesCounter] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [usersName, setUsersName] = useState("");

  const [commentCount, setCommentCount] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();
  Modal.setAppElement("#root");

  function getPostId(id) {
    postLike(id);
    setUserLiked((liked) => {
      const value = liked ? -1 : 1;
      setLikesCounter((l) => l + value);
      return !liked;
    });
  }

  function toggleEdit() {
    setEditing((editing) => {
      if (editing) setText(currMessage);
      return !editing;
    });
  }

  useEffect(() => {
    getLikes().then((r) => {
      const likesData = r.data;

      likesData.forEach((e) => {
        if (e.postId === id) {
          const users = e.usersWhoLiked;

          setLikesCounter(users.length);
          if (users.includes(userName)) {
            setUserLiked(true);
          }

          for (let i = 0; i < users.length; i++) {
            const n = users[i];
            if (n !== userName) {
              setUsersName(n);
              break;
            }
          }
        }
      });
    });
  }, [id, userName]);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, [editing]);

  useEffect(() => {
    getComments()
    .then(r => {
      const {comments} = r.data;
      for (let i = 0; i < comments.length; i++) {
        const element = comments[i];
        if (element.postid === id) {
          setCommentCount(element.countcomment);
          break;
        }
      }
    })
    .catch(err => console.log(err));

    getCommentsId(id)
    .then(r => setComments(r.data.comments))
    .catch(err => console.log(err));

  }, [id, updateComments]);

  function handleText(e) {
    const ref = e.target;
    setText(ref.value);
    ref.style.height = 0;
    ref.style.height = ref.scrollHeight + "px";
  }

  function keyPressHandler(e) {
    if (e.key === "Escape") toggleEdit();
    if (e.key === "Enter") {
      e.target.disabled = true;
      setLoading(true);

      updatePost({ id, message: text })
        .then(() => {
          setLoading(false);
          setEditing(false);
          setCurrMessage(text);
        })
        .catch((err) => {
          setLoading(false);
          e.target.disabled = false;
          window.alert("N??o foi poss??vel salvar as altera????es.");
          console.log(err);
        });
    }
  }

  function toggleModal() {
    setModalIsOpen((state) => !state);
  }

  function deleteHandler() {
    setDeleteLoading(true);
    deletePost(id)
      .then(() => {
        toggleModal();
        updateTimeline();
      })
      .catch((err) => {
        toggleModal();
        window.alert("N??o foi poss??vel excluir o post.");
      });
  }

  function toUserPosts() {
    navigate("/user/" + user_id);
    updateTimeline();
  }

  function confirmRepost(id) {
    Swal.fire({
      title: "Do you want to re-post this link?",
      showCancelButton: true,
      confirmButtonText: "Yes, share!",
      cancelButtonText: "No, cancel",
      customClass: {
        cancelButton: "order-1 cancel",
        confirmButton: "order-2 ok",
        popup: "pop-up",
        title: "title",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        sharePost(id);
      }
    });
  }

  function sharePost(id) {
    repost(id);
    updateTimeline();
  }

  return (
    <PostStyle>
      {sharerId ? (
        <p className="repost-text">
          <Fa.FaRetweet className="icon" />
          <span>
            Re-posted by{" "}
            <span className="sharer-name">
              {sharerName === user.name ? "you" : sharerName}
            </span>
          </span>
        </p>
      ) : (
        ""
      )}
      <div className="post-item">
        {owner && (
          <div className="options">
            <IconContext.Provider value={{ size: "20px" }}>
              <div className="edit" onClick={toggleEdit}>
                <RiPencilFill />
              </div>
              <div className="delete" onClick={toggleModal}>
                <IoTrash />
              </div>
            </IconContext.Provider>
          </div>
        )}
        {owner && (
          <Modal
            isOpen={modalIsOpen}
            className="modal"
            overlayClassName="overlay"
          >
            {deleteLoading ? (
              <TailSpin
                height="80"
                width="80"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
              />
            ) : (
              <>
                <div className="title">
                  Are you sure you want to delete this post?
                </div>
                <div className="buttons">
                  <button className="cancel" onClick={toggleModal}>
                    No, go back
                  </button>
                  <button className="ok" onClick={deleteHandler}>
                    Yes, delete it
                  </button>
                </div>
              </>
            )}
          </Modal>
        )}

        <PostSidebar>
          <img src={image_url} alt="" onClick={toUserPosts} />
          <div className="post-action-list">
            <div className="action">
              {userLiked && likesCounter > 2 ? (
                <BsFillHeartFill
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={`Voc??, ${usersName} e outras ${
                    likesCounter - 2
                  } pessoas`}
                  color="Crimson"
                  onClick={() => getPostId(id)}
                />
              ) : userLiked && likesCounter > 1 ? (
                <BsFillHeartFill
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={`Voc?? e ${usersName}`}
                  color="Crimson"
                  onClick={() => getPostId(id)}
                />
              ) : userLiked ? (
                <BsFillHeartFill
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={`Voc??`}
                  color="Crimson"
                  onClick={() => getPostId(id)}
                />
              ) : likesCounter > 1 ? (
                <BsFillHeartFill
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={`${usersName} e outra ${likesCounter - 1} pessoa`}
                  onClick={() => getPostId(id)}
                />
              ) : likesCounter === 1 ? (
                <BsFillHeartFill
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={`${usersName}`}
                  onClick={() => getPostId(id)}
                />
              ) : (
                <BsFillHeartFill
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  onClick={() => getPostId(id)}
                />
              )}
              <p>{likesCounter} likes</p>
            </div>
            <div className="action" onClick={() => setCommentOpen(true)}>
                <AiOutlineComment/> 
                <p>{commentCount} Comments</p>
            </div>
            <div className="action" onClick={() => confirmRepost(id)}>
              <Fa.FaRetweet />
              <p>{shareCount} re-post</p>
            </div>
          </div>
        </PostSidebar>

        <div className="content">
          <div className="name" onClick={toUserPosts}>
            {name}
          </div>
          {editing ? (
            <textarea
              type="text"
              name="editmsg"
              id="editmsg"
              maxLength="1000"
              value={text}
              onFocus={handleText}
              onChange={handleText}
              ref={inputRef}
              onKeyDown={keyPressHandler}
            />
          ) : (
            <div className="message">
              <HashtagText>{currMessage}</HashtagText>
            </div>
          )}
          {link ? <PostLink data={link} /> : null}
        </div>
      </div>
      <div className="post-comments">
        {commentOpen && comments.map((e, i) => <PostComment key={i} data={e}/>)}
        <PostAuthor postId={id} setUpdateComments={setUpdateComments}/>
      </div>
    </PostStyle>
  );
}
