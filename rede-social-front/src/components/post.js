import React from "react";
import useFetchPosts from "../hooks/useFetchPosts";

import "../styles/feed.css";

const Post = () => {
  const posts = useFetchPosts();

  return (
    <div className="feed-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.description}</h2>
            {post.image && (
              <img
                src={post.image}
                alt="imagem de usuario"
                className="feed-image"
              />
            )}
            <div className="likes">
              <p>Likes: {post.likes.length}</p>
            </div>
            <div className="likes">
              <h3>Comments</h3>
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <p key={comment._id}>{comment.text}</p>
                ))
              ) : (
                <p>No comments</p>
              )}
            </div>
            <div className="likes">
              <p> {new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Post;
