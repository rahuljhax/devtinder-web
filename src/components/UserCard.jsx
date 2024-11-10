import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = (user) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, skills, about, photoUrl } =
    user.user;

  const reviewFeedHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            className="h-80 w-full object-cover"
            src={
              photoUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s"
            }
            alt="User photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age} | ${gender}`}</p>}
          {about && <p>{about}</p>}
          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-primary"
              onClick={() => reviewFeedHandler("ignored", _id)}
            >
              Ignored
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => reviewFeedHandler("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
export default UserCard;
