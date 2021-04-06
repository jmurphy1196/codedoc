import { useTypedSelector } from "../hooks/use-typed-selector";
import { useRef } from "react";

interface ShareCodeDocProps {
  setModalState: any;
}


const ShareCodeDoc: React.FC<ShareCodeDocProps> = ({ setModalState }) => {
  const user = useTypedSelector((state) => state.user.id);
  let documentName = useTypedSelector((state) => state.user.currentDoc);
  const modal = useRef<any>();

  if (documentName) {
    documentName = documentName.split(" ").join("-");
  }

  const closeModal = () => {
    modal.current.classList.toggle("is-active");
    setModalState(false);
  };

  return (
    <div ref={modal} className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'> Share CodeDoc </p>
          <button
            onClick={closeModal}
            className='delete'
            aria-label='close'
          ></button>
        </header>
        <section className='modal-card-body'>
          {documentName ? (
            <h1>{`http://localhost:3000/${user}/${documentName}`}</h1>
          ) : (
            <h1>You must save your codeDoc before sharing</h1>
          )}
        </section>
        <footer className='modal-card-foot'>
          <button onClick={closeModal} className='button'>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ShareCodeDoc;
