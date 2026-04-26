import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getVisitorId = () => {
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = `visitor_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
};

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [deletedPostId, setDeletedPostId] = useState(null);
  const visitorId = getVisitorId();

  useEffect(() => {
    axios
      .get("http://localhost:3000/all-post", {
        params: { ownerId: visitorId },
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [visitorId]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete-post/${id}`, {
        params: { ownerId: visitorId },
      })
      .then((res) => {
        console.log(res.data.message);
        setDeletedPostId(id);
        setPosts((prev) => prev.filter((post) => post._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="feed">
      <h1>Feed</h1>
      <button className="create-post-page" onClick={() => navigate("/")}>
        Create a post
      </button>
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className="post">
            <img src={post.image} alt="Post" />
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="btns">
              <button
                onClick={() => handleDelete(post._id)}
                className="btn-delete"
              >
                {deletedPostId === post._id ? "Deleted" : "Delete"}
              </button>
              <button
                onClick={() => navigate(`/edit/${post._id}`)}
                className="btn-update"
              >
                Edit
              </button>
            </div>
          </div>
        ))}

      {posts.length === 0 && <p>No posts available</p>}
    </section>
  );
};

export default Feed;
