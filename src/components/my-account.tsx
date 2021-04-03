import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useHistory } from "react-router-dom";
import { useActions } from "../hooks/use-actions";
import Navbar from "./navbar";

const MyAccount: React.FC = () => {
  const [input, setInput] = useState("");
  const user = useTypedSelector((state) => state.user.id);
  const codeDocs = useTypedSelector((state) => state.user.codeDocs);
  const history = useHistory();
  const { getCodeDoc } = useActions();

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
  }, []);
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
          <a className='is-active'>MyDocs</a>
        </p>
        {codeDocsToShow.map((codeDoc) => {
          if (codeDoc)
            return (
              <a
                onClick={() => getCodeDoc(codeDoc, history)}
                key={`${Math.random()}-${codeDoc}`}
                className='panel-block '
              >
                <span className='panel-icon'>
                  <i className='fas fa-book' aria-hidden='true'></i>
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
