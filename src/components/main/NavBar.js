import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { startLogout } from "../../actions/auth";

export const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <>
      <nav className="navbar navbar-expand-xl navbar-dark bg-primary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            rel="noreferrer"
          >
            App Sis
          </a>
          <div className="collapse navbar-collapse show" id="navbarDark">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/movies/1">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/songs/1">
                  Songs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/books/1">
                  Books
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <button
                className="btn btn-outline-light"
                onClick={handleLogout}
                type="submit"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
