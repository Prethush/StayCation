import { Container, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import userLogo from "../assets/images/user_logo.png";
import { logout } from "../slices/auth";
import { useDispatch } from "react-redux";

function Header() {
  const [btnSelected, setBtnSelected] = useState("home");
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBtnClick = (val) => {
    setBtnSelected(val);
  };

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Navbar bg="light" expand="lg" className="p-3">
        <Container fluid>
          <Link to="/" onClick={() => handleBtnClick("home")}>
            <svg
              viewBox="0 0 187 20"
              width="9rem"
              height="1rem"
              className="staycation-logo "
              color="#ff3366"
            >
              <path
                d="M4.397 13.207c0 2.065 1.221 3.288 3.04 3.288 1.41 0 2.497-.897 2.497-2.229 0-1.521-1.303-2.01-2.959-2.663C3.474 10.3.543 9.24.543 5.353.543 1.848 3.745 0 7.219 0c4.506 0 6.759 2.826 6.759 6.06H9.58c0-1.712-.842-2.745-2.362-2.745-1.275 0-2.307.652-2.307 1.957 0 1.277 1.086 1.93 2.715 2.5 3.12 1.087 6.676 2.337 6.676 6.141 0 3.94-2.958 6.087-7.138 6.087C3.094 20 0 17.554 0 13.207h4.397zM22.5 4.293H18.21V.49h13v3.804h-4.314v15.218H22.5V4.293zm19.867 1.63l-2.334 7.827h4.614l-2.28-7.826zm4.098 13.588l-.733-2.31h-6.758l-.733 2.31h-4.695L40.331.489h4.044l6.867 19.022h-4.777zm14.385 0H55.99l3.502-7.147L52.762.49h5.13l4.043 7.473L65.41.489h4.858L60.85 19.511zm31.347-6.82C91.464 16.738 87.963 20 82.725 20 76.32 20 72.52 15.326 72.52 9.973 72.52 4.783 76.266 0 82.48 0c5.918 0 9.12 3.533 9.69 7.88h-4.587c-.434-2.228-2.117-3.913-4.83-3.913-3.692 0-5.755 2.88-5.755 6.006 0 3.342 2.172 6.06 5.971 6.06 2.144 0 4.044-1.468 4.56-3.343h4.668zm12.43-6.767l-2.333 7.826h4.614l-2.28-7.826zm4.099 13.587l-.733-2.31h-6.758l-.733 2.31h-4.695L102.592.489h4.044l6.867 19.022h-4.777zm11.4-15.218h-4.29V.49h13.001v3.804h-4.315v15.218h-4.397V4.293zM134.455.49h4.45v19.022h-4.45V.489zM155.055 20c-6.325 0-10.07-4.783-10.07-10s3.745-10 10.07-10c6.296 0 10.041 4.783 10.041 10s-3.745 10-10.042 10zm0-3.967c3.473 0 5.563-2.908 5.563-6.033 0-3.125-2.09-6.033-5.564-6.033s-5.564 2.908-5.564 6.033c0 3.125 2.09 6.033 5.564 6.033zm27.574-3.153V.49H187v19.02h-4.587l-6.84-12.227V19.51h-4.396V.489h4.587l6.866 12.391z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav className="d-flex flex-column d-lg-flex flex-lg-row">
              <Link
                to="/"
                className={
                  btnSelected === "home"
                    ? "fw-bold me-4 link_elm text-decoration-underline"
                    : "fw-bold text-decoration-none me-4 link_elm"
                }
                onClick={() => handleBtnClick("home")}
              >
                Home
              </Link>
              <Link
                to="#action2"
                className={
                  btnSelected === "link"
                    ? "fw-bold me-4 link_elm text-decoration-underline"
                    : "fw-bold text-decoration-none me-4 link_elm"
                }
                onClick={() => handleBtnClick("link")}
              >
                Link
              </Link>
              {accessToken ? (
                <div className="me-4 dropdown" style={{ cursor: "pointer" }}>
                  <img
                    src={userLogo}
                    alt={user?.name}
                    style={{ width: "1.5rem" }}
                  />
                  <span
                    style={{ color: "#ff3366", fontWeight: "900" }}
                    className="dropdown-toggle"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user?.name}
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/user/profile/${user._id}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={
                    btnSelected === "signin"
                      ? "fw-bold me-4 link_elm text-decoration-underline"
                      : "fw-bold text-decoration-none me-4 link_elm"
                  }
                  onClick={() => handleBtnClick("signin")}
                >
                  Signin
                </Link>
              )}
              {accessToken ? (
                <span
                  style={{
                    color: "#ff3366",
                    fontWeight: "900",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              ) : (
                <Link
                  to="/register"
                  className={
                    btnSelected === "signup"
                      ? "fw-bold me-4 link_elm text-decoration-underline"
                      : "fw-bold text-decoration-none me-4 link_elm md:d-inline"
                  }
                  onClick={() => handleBtnClick("signup")}
                >
                  Signup
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
