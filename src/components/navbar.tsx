import { useTypedSelector } from "../hooks/use-typed-selector";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/use-actions";
const Navbar: React.FC = () => {
  const { signout } = useActions();
  const user = useTypedSelector((state) => state.user.id);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" href="https://bulma.io">
          <h1 className="is-size-2">
            {"<"}CodeDoc{" />"}
          </h1>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Documentation</a>

          {user && <a className="navbar-item">Share</a>}
        </div>
        <div className="navbar-end">
          {!user ? (
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/signup" className="button is-primary">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/signin" className="button is-light">
                  Log in
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/signup" className="button is-primary">
                  <strong> My Account</strong>
                </Link>
                <button onClick={() => signout()} className="button is-light">
                  <strong> Signout</strong>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
