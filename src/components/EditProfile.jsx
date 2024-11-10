import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  // Setting up useState variables for each field
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [isDataSaved, setIsDataSaved] = useState(false);
  const dispatch = useDispatch();
  const saveProfileHandler = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setIsDataSaved(true);
      setTimeout(() => {
        setIsDataSaved(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      {isDataSaved && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center align-items-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl flex items-center justify-center py-10 mx-10">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          {/* Last Name Field */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          {/* Photo URL Field */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Photo</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          {/* Age Field */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          {/* Gender Field */}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <select
              className="select select-bordered"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled selected>
                Select
              </option>
              <option>male</option>
              <option>female</option>
              <option>others</option>
            </select>
          </label>

          {/* About Field */}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-full max-w-xs"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </label>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="btn btn-primary btn-wide my-5"
            onClick={saveProfileHandler}
          >
            Save Profile
          </button>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
    </>
  );
};

export default EditProfile;
