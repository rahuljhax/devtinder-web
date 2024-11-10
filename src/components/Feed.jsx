import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if (!feed) return;
  if (feed.length <= 0) {
    return <h1>No User Found</h1>;
  }

  return (
    feed && (
      <>
        <div className="flex justify-center my-10">
          <UserCard user={feed[0]} />
        </div>
      </>
    )
  );
};
export default Feed;
