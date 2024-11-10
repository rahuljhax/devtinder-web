import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeAllFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(removeUser());
        dispatch(removeAllFeed());
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div data-theme="dark" className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            🧑‍💻 DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex">
            <span className="mx-2">Welecome, {user.firstName}</span>
            <div className="flex-none gap-2">
              <div className="form-control"></div>
              <div className="dropdown dropdown-end mr-5">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoUrl}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={"/connections"}>Connections</Link>
                  </li>
                  <li>
                    <Link to={"/requests"}>Requests</Link>
                  </li>
                  <li>
                    <span onClick={logoutHandler}>Logout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;
