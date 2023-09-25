import { updateCurrentUser, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { useError } from "../error/ErrorProvider";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Profile() {
  const [, pushError] = useError();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState();
  const [profileImageSrc, setProfileImageSrc] = useState();

  useEffect(() => {
    if (profileImage && profileImage.name) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfileImageSrc(fileReader.result);
      };
      fileReader.readAsDataURL(profileImage);
    }
  }, [profileImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const displayName = formData.get("displayName");
    // const email = formData.get("email");
    // const oldPassword = formData.get("oldPassword");
    // const newPassword = formData.get("newPassword");
    // const confirmNewPassword = formData.get("confirmNewPassword");

    const updatedProfile = {};
    let profileUrl = null;

    if (profileImage) {
      const photoRef = ref(storage, `images/${auth.currentUser.uid}/profile`);
      await uploadBytes(photoRef, profileImage);
      profileUrl = await getDownloadURL(photoRef);
    }

    if (displayName) {
      updatedProfile.displayName = displayName;
    }

    if (profileUrl) {
      updatedProfile.photoURL = profileUrl;
    }

    if (Object.keys(updatedProfile).length !== 0) {
      updateProfile(auth.currentUser, updatedProfile)
        .then(async () => {
          console.log(auth.currentUser.photoURL);
          await updateCurrentUser(auth, auth.currentUser);
          navigate("/");
        })
        .catch((err) => {
          pushError(err.message);
        });
    }
  };

  return (
    <div className="container p-2">
      <form
        className="mt-4 d-flex flex-column w-50 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-2 align-self-center position-relative">
          <img
            src={
              profileImageSrc ||
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="
            }
            alt="profile"
            className="img-fluid rounded-circle "
            style={{ width: 200 }}
          />
          <label
            htmlFor="img-upload"
            className="btn position-absolute top-0 end-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              fill="currentColor"
              className="bi bi-camera fs-4 text-black-50"
              viewBox="0 0 16 16"
            >
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </svg>
          </label>
          <input
            id="img-upload"
            type="file"
            name="profileImage"
            className="d-none"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="display-name" className="form-label">
            Display Name
          </label>
          <input
            id="display-name"
            name="displayName"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="old-password" className="form-label">
            Old Password
          </label>
          <input
            id="old-password"
            name="oldPassword"
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="new-password" className="form-label">
            New Password
          </label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirm--new-password" className="form-label">
            Confirm New Password
          </label>
          <input
            id="confirm-new-password"
            name="confirmNewPassword"
            type="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-danger align-self-center px-5">
          Submit
        </button>
      </form>
    </div>
  );
}
