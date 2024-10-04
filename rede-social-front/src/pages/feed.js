import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const user = getCurrentUser();

      if (user && user.token) {
        try {
          const response = await fetch("http://localhost:5000/api/posts", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }

          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Feed</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.description}</h2>
            {post.image && <img src={post.image} alt="Post visual" />}
            <p>Likes: {post.likes.length}</p>
            <div>
              <h3>Comments</h3>
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <p key={comment._id}>{comment.text}</p>
                ))
              ) : (
                <p>No comments</p>
              )}
            </div>
            <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Feed;
