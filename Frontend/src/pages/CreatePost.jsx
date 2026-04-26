import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const getVisitorId = () => {
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = `visitor_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
};

const CreatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const visitorId = getVisitorId();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    axios
      .get(`http://localhost:3000/post/${id}`, {
        params: { ownerId: visitorId },
      })
      .then((res) => {
        setFormState({
          title: res.data.post.title,
          content: res.data.post.content,
          imageUrl: res.data.post.image,
        });
      })
      .catch((err) => {
        console.error(err);
        navigate("/feed");
      });
  }, [id, navigate, visitorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("ownerId", visitorId);

    const url = id
      ? `http://localhost:3000/update-post/${id}`
      : "http://localhost:3000/upload-post";

    try {
      await axios({
        method: id ? "patch" : "post",
        url,
        data: formData,
      });
      navigate("/feed");
    } catch (err) {
      console.error(err);
      setError("Unable to save the post. Please try again.");
    }
  };

  return (
    <section className="create-post">
      <h1>{id ? "Edit Post" : "Create Post"}</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" />
        {id && formState.imageUrl && (
          <img
            src={formState.imageUrl}
            alt="Current"
            style={{ maxWidth: "250px", marginBottom: "16px" }}
          />
        )}
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter Your Post Title"
          required
        />
        <textarea
          type="text"
          name="content"
          value={formState.content}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Enter Your Post caption"
          required
        ></textarea>
        <button type="submit">{id ? "Update" : "Submit"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
};

export default CreatePost;
