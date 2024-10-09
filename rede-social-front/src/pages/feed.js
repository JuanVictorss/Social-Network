import Post from "../components/post";
import Logout from "../components/logout";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  return (
    <div>
      <Logout />
      <Post />
    </div>
  );
};

export default Feed;
