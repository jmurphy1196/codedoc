import { Link } from "react-router-dom";
const Documentation: React.FC = () => {
  return (
    <div>
      <div className='container'>
        <h1 className='is-size-3 has-text-centered'>Documentation</h1>
        <h1
          className='has-text-centered'
          style={{ textTransform: "uppercase", letterSpacing: "2px" }}
        >
          welcome to codedoc :D{" "}
        </h1>
        <p style={{ marginTop: "2rem" }}>
          To start writing code visit our home page. There you can immediately
          start writing both javascript and typescript as well as import
          packages as you would normally through npm
        </p>
        <p>
          heads up! your code can use a built-in function called show() which
          can take a react component to display quickly in the DOM
        </p>
        <p style={{ marginTop: "2rem" }}>
          To save your codedoc make sure you have an{" "}
          <Link to='/signup'>account. </Link> And then you will be able to both
          save and share your codedoc
        </p>
      </div>
    </div>
  );
};

export default Documentation;
