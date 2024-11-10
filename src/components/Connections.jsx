import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";
const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connectionsData) return;
  if (connectionsData.length === 0) return <h1>No Connection Found</h1>;
  return (
    <>
      <div className="w-1/2 m-auto mt-10">
        <h1 className="text-3xl mb-5 text-center">Connections</h1>
        {connectionsData.map((connection) => {
          const { firstName, lastName, age, gender, about, photoUrl } =
            connection;
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
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
