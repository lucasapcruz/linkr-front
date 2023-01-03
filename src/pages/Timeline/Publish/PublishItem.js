import axios from "axios";
import { useState } from "react";
import { PublishStyle } from "./PublishStyle";

export default function PublishItem({updateTimeline}) {
  const [loading, setLoading] = useState(false);

  function eventHandler(e) {
    const items = Array.from(e.target);
    e.preventDefault();
    setLoading(true);
    items.forEach(e => e.disabled = true);

    const { link, message } = e.target;
    const data = { message: message.value };
    if (link.value) data.link = link.value;

    const token = "one";
    const headers = {Authorization: "Bearer " + token};
    axios.post("http://localhost:5000/posts", data, {headers})
    .then(r => {
      setLoading(false);
      updateTimeline();
      items.forEach(e => {
        e.disabled = false;
        e.value = "";
      });
    })
    .catch(e => {
      console.log(e);
      window.alert("Houve um erro ao publicar seu link");
      setLoading(false);
      items.forEach(e => {
        e.disabled = false;
        e.value = "";
      });
    });
  }

  return (
    <PublishStyle>
      <img src="" alt=""/>
      <form className="content" onSubmit={eventHandler}>
        <div className="title">What are you going to share today?</div>
        <input type="url" name="link" id="link" placeholder="http://..."/>
        <textarea type="text" name="message" id="message" rows="3" maxLength="1000" placeholder="Awesome article about #javascript" required/>
        <button>{loading ? "Publishing..." : "Publish"}</button>
      </form>
    </PublishStyle>
  );
}