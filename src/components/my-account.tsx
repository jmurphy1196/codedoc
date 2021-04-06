import "./my-account.css";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useHistory } from "react-router-dom";
import { useActions } from "../hooks/use-actions";
import Navbar from "./navbar";

const MyAccount: React.FC = () => {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const user = useTypedSelector((state) => state.user.id);
  const codeDocs = useTypedSelector((state) => state.user.codeDocs);
  const history = useHistory();
  let activePanel = useRef<any>();
  const { getCodeDoc, getUserCodeDocs, deleteCodeDoc } = useActions();

  let codeDocsToShow = codeDocs.map((doc) => doc);
  codeDocsToShow = codeDocsToShow.map((doc) => {
    if (doc.includes(input)) {
      return doc;
    }
    return "";
  });
  useEffect(() => {
    if (!user) {
      history.push("/signin");
    }

    getUserCodeDocs();
  }, []);

  const handleActiveTab = (e: MouseEvent) => {
    if (activePanel.current !== e.target) {
      activePanel.current.classList.toggle("is-active");
      activePanel.current = e.target;
      activePanel.current.classList.toggle("is-active");
      if (activePanel.current.id === "remove-tab") {
        setEdit(true);
      } else {
        setEdit(false);
      }
    }
  };
  return (
    <>
      <Navbar />
      <nav className='panel'>
        <p className='panel-heading'>CodeDocs</p>
        <div className='panel-block'>
          <p className='control has-icons-left'>
            <input
              className='input'
              type='text'
              placeholder='Search'
              onChange={(e) => {
                setInput(e.target.value.toLowerCase());
              }}
            />
            <span className='icon is-left'>
              <i className='fas fa-search' aria-hidden='true'></i>
            </span>
          </p>
        </div>
        <p className='panel-tabs'>
          <a
            id='view-tab'
            onClick={handleActiveTab}
            ref={activePanel}
            className='is-active'
          >
            View
          </a>
          <a id='remove-tab' onClick={handleActiveTab}>
            Remove
          </a>
        </p>
        {!edit
          ? codeDocsToShow.map((codeDoc) => {
              if (codeDoc)
                return (
                  <a
                    onClick={() => getCodeDoc(codeDoc, history)}
                    key={`${Math.random()}-${codeDoc}`}
                    className='panel-block '
                  >
                    <span className='panel-icon'>
                      <i
                        className='fas fa-book view-icon'
                        aria-hidden='true'
                      ></i>
                    </span>
                    {codeDoc}
                  </a>
                );
            })
          : codeDocsToShow.map((codeDoc) => {
              if (codeDoc)
                return (
                  <a
                    onClick={() => deleteCodeDoc(codeDoc)}
                    key={`${Math.random()}-${codeDoc}`}
                    className='panel-block '
                  >
                    <span className='panel-icon remove-icons'>
                      <i
                        className='fas fa-times remove-icon'
                        aria-hidden='true'
                      ></i>
                    </span>
                    {codeDoc}
                  </a>
                );
            })}
      </nav>
    </>
  );
};

export default MyAccount;
