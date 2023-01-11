import { useState } from "react";
import { postPost } from "../../../services/api";
import { PublishStyle } from "./PublishStyle";

export default function PublishItem({ image, updateTimeline }) {
  const [loading, setLoading] = useState(false);

  function formHandler(e) {
    const items = Array.from(e.target);
    e.preventDefault();
    setLoading(true);
    items.forEach((e) => (e.disabled = true));

    const { link, message } = e.target;
    const data = { link: link.value };
    if (message.value) data.message = message.value;

    postPost(data)
      .then((r) => {
        setLoading(false);
        updateTimeline();
        items.forEach((e) => {
          e.disabled = false;
          e.value = "";
        });
      })
      .catch((e) => {
        console.log(e);
        window.alert("Houve um erro ao publicar seu link");
        setLoading(false);
        items.forEach((e) => (e.disabled = false));
      });
  }

  return (
    <PublishStyle className="publish">
      <img
        src={
          image
            ? image
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png"
        }
        alt=""
      />
      <form className="content" onSubmit={formHandler}>
        <input
          type="url"
          name="link"
          id="link"
          placeholder="http://..."
          required
        />
        <textarea
          type="text"
          name="message"
          id="message"
          rows="3"
          maxLength="1000"
          placeholder="Awesome article about #javascript"
        />
        <button>{loading ? "Publishing..." : "Publish"}</button>
      </form>
    </PublishStyle>
  );
}
