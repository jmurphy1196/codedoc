import { useState, useRef } from "react";

interface SaveCodeDocProps {
  setModalState: any;
}

const SaveCodedoc: React.FC<SaveCodeDocProps> = ({ setModalState }) => {
  const [input, setInput] = useState("");
  const modal = useRef<any>();
  const closeModal = () => {
    modal.current.classList.toggle("is-active");
    setModalState(false);
  };
  return (
    <div ref={modal} className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Save CodeDoc </p>
          <button
            onClick={closeModal}
            className='delete'
            aria-label='close'
          ></button>
        </header>
        <section className='modal-card-body'>
          <input
            onChange={(e) => setInput(e.target.value.trim())}
            type='text'
            className={`input is-${input.length < 3 ? "danger" : "valid"}`}
            placeholder='document name...'
          />
        </section>
        <footer className='modal-card-foot'>
          <button disabled={input.length < 3} className='button is-success'>
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
