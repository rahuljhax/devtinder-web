import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/RequestSlice";
import { useEffect } from "react";
const Requests = () => {
  const dispatch = useDispatch();
  const requestsData = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewHandler = async (status, _id) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!requestsData) return;
  if (requestsData.length === 0) return <h1>No Requests Found</h1>;
  return (
    <>
      <div className="w-1/2 m-auto mt-10">
        <h1 className="text-3xl mb-5 text-center">Connection Requests</h1>
        {requestsData.map((request) => {
          const { firstName, lastName, age, gender, about, photoUrl } =
            request.fromUserId;
          return (
            <>
              <div className="card card-side bg-base-300 shadow-xl mb-5 flex justify-between p-3">
                <figure className="">
                  <img
                    className="rounded-full w-full w-36 h-36"
                    src={photoUrl}
                    alt="Movie"
                  />
                </figure>
                <div className="card-body w-1/2">
                  <h2 className="card-title">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p>
                      {age} Yrs | {gender}
                    </p>
                  )}
                  {about && <p>{about}</p>}
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        reviewHandler("rejected", request._id);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        reviewHandler("accepted", request._id);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
