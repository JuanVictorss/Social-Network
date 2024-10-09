import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);

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
        }
      }
    };

    fetchPosts();
  }, []);

  return posts;
};

export default useFetchPosts;
