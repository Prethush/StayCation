import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserInfo } from "../../slices/auth";
import profileImg from "../../assets/images/user_profile_img2.png";
import "./Profile.css";
import Layout from "./Layout";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const [btnClicked, setBtnClicked] = useState(false);
  const userInfo = useSelector((state) => state.auth.user);
  console.log(userInfo, "kkkk");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);
  useEffect(() => {
    if (Object.keys(userInfo).length) {
      setUser(userInfo);
    }
  }, [userInfo]);

  return (
    <Layout>
      <section className="container mt-5 d-flex flex-column flex-xl-row">
        <aside className="col-12 col-xl-3 aside rounded-3 ">
          <div className="d-flex flex-column align-items-center p-3">
            <img
              src={profileImg}
              alt={user?.name}
              className="rounded-circle"
              style={{ width: "7rem", height: "7rem" }}
            />
            <Link to="/" className="text-body mt-1">
              Update photo
            </Link>
          </div>
        </aside>
        <article className="col-12 col-xl-8 h-100 article">
          <div>
            <h2>Hi, {user?.name}</h2>
            <span style={{ color: "gray", fontSize: ".9rem" }}>
              Joined in {user?.createdAt}
            </span>
          </div>
          <div>
            <span
              className="text-decoration-underline mt-3 d-block"
              role="button"
              onClick={() => setBtnClicked(true)}
              style={
                btnClicked
                  ? { pointerEvents: "none", color: "lightgrey" }
                  : { pointerEvents: "auto" }
              }
            >
              Edit Profile
            </span>
            {btnClicked && (
              <form action="" className="mt-4">
                <fieldset className="d-flex flex-column mt-4">
                  <label className="mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={user?.name}
                    className="p-2 rounded-2 form-input"
                  />
                </fieldset>
                <fieldset className="d-flex flex-column mt-4">
                  <label className="mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={user?.email}
                    className="p-2 rounded-2 form-input"
                  />
                </fieldset>
                <fieldset className="d-flex flex-column mt-4">
                  <label className="mb-2" htmlFor="pwd">
                    Password
                  </label>
                  <input
                    type="password"
                    id="pwd"
                    className="p-2 rounded-2 form-input"
                  />
                </fieldset>
                <fieldset className="d-flex flex-column mt-4">
                  <label className="mb-2" htmlFor="phone">
                    Mobile No
                  </label>
                  <input
                    type="number"
                    id="phone"
                    value={user?.phone_no}
                    className="p-2 rounded-2 form-input"
                  />
                </fieldset>
                <fieldset className="mt-4 d-flex justify-content-between">
                  <input
                    type="submit"
                    className="btn bg-dark text-white px-4"
                    value="Cancel"
                    onClick={() => {
                      setBtnClicked(false);
                    }}
                  />
                  <input
                    type="submit"
                    className="btn bg-dark text-white px-4"
                    value="Save"
                  />
                </fieldset>
              </form>
            )}
            <div className="review_sec">
              <div className="d-flex">
                <i class="fa-solid fa-star" style={{ fontSize: "1.5rem" }}></i>
                <h4 className="ms-2">O reviews</h4>
              </div>
              <hr />
            </div>
            <div className="review_sec">
              <span
                class="text-decoration-underline d-block"
                style={{ marginBottom: "1.9rem" }}
              >
                Reviews by you
              </span>
              <hr />
            </div>
          </div>
        </article>
      </section>
    </Layout>
  );
}

export default Profile;
