import { useState, useRef } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";

interface SaveCodeDocProps {
  setModalState: any;
}

const SaveCodedoc: React.FC<SaveCodeDocProps> = ({ setModalState }) => {
  const codeDoc = useTypedSelector((state) => {
    return {
      order: state.cells.order,
      data: state.cells.data,
    };
  });
  const currentDoc = useTypedSelector((state) => state.user.currentDoc);

  const [input, setInput] = useState(currentDoc || "");
  const { saveCodeDoc } = useActions();

  const alphanumericAndSpaceEx = /^[a-z\d\-_\s]+$/i;
  const disabled = !alphanumericAndSpaceEx.test(input) && input.length >= 4;

  const modal = useRef<any>();
  const closeModal = () => {
    modal.current.classList.toggle("is-active");
    setModalState(false);
  };

  const handleSaveCodeDoc = () => {
    saveCodeDoc(codeDoc, input);
    //TODO CHECK FOR USER ERROR
    setModalState(false);
  };

  return (
    <div ref={modal} className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'> Save CodeDoc </p>
          <button
            onClick={closeModal}
            className='delete'
            aria-label='close'
          ></button>
        </header>
        <section className='modal-card-body'>
          <p>use alphanumeric characters and spaces only</p>
          {currentDoc ? (
            <input
              defaultValue={currentDoc}
              onChange={(e) => setInput(e.target.value.trim())}
              type='text'
              className={`input is-${input.length < 3 ? "danger" : "valid"}`}
              placeholder='document name...'
            />
          ) : (
            <input
              onChange={(e) => setInput(e.target.value.trim())}
              type='text'
              className={`input is-${input.length < 3 ? "danger" : "valid"}`}
              placeholder='document name...'
            />
          )}
        </section>
        <footer className='modal-card-foot'>
          <button
            onClick={handleSaveCodeDoc}
            disabled={disabled}
            className='button is-success'
          >
            Save changes
          </button>
          <button onClick={closeModal} className='button'>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SaveCodedoc;
