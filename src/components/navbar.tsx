import { useTypedSelector } from "../hooks/use-typed-selector";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/use-actions";
import SaveCodedoc from "./save-codedoc";
import ShareCodedoc from "./share-codedoc";
const Navbar: React.FC = ({ children }) => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { signout } = useActions();
  const user = useTypedSelector((state) => state.user.id);
  const fullPath = window.location.href.split("/");
  const path = fullPath[fullPath.length - 1];
  return (
    <>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item' href='https://bulma.io'>
            <h1 className='is-size-2'>
              {"<"}CodeDoc{" />"}
            </h1>
          </Link>

          <a
            role='button'
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-start'>
            <Link to='/' className='navbar-item'>
              Home
            </Link>
            <Link to='/documentation' className='navbar-item'>
              Documentation
            </Link>

            {user && path !== "documentation" && path !== "my-account" && (
              <>
                <a
                  onClick={() => setSaveModalOpen(true)}
                  className='navbar-item'
                >
                  Save
                </a>
                <a
                  onClick={() => setShareModalOpen(true)}
                  className='navbar-item'
                >
                  Share
                </a>
              </>
            )}
          </div>
          <div className='navbar-end'>
            {!user ? (
              <div className='navbar-item'>
                <div className='buttons'>
                  <Link to='/signup' className='button is-primary'>
                    <strong>Sign up</strong>
                  </Link>
                  <Link to='/signin' className='button is-light'>
                    Log in
                  </Link>
                </div>
              </div>
            ) : (
              <div className='navbar-item'>
                <div className='buttons'>
                  <Link to='/my-account' className='button is-primary'>
                    <strong> My Account</strong>
                  </Link>
                  <button onClick={() => signout()} className='button is-light'>
                    <strong> Signout</strong>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {saveModalOpen && <SaveCodedoc setModalState={setSaveModalOpen} />}
        {shareModalOpen && <ShareCodedoc setModalState={setShareModalOpen} />}
      </nav>
      {children}
    </>
  );
};

export default Navbar;
