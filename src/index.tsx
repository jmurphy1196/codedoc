import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import axios from "axios";
import CellList from "./components/cell-list";
import AuthForm from "./components/auth-form";
import MyAccount from "./components/my-account";
import Documentation from "./components/documentation";
import { Provider } from "react-redux";
import { store } from "./redux";
import { useActions } from "./hooks/use-actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";

const App = () => {
  const { setUser } = useActions();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${
          process.env.SERVER_URL || "https://code-doc-backend.herokuapp.com"
        }/api/auth/current-user`,
        {
          withCredentials: true,
        }
      );
      if (data.currentUser) {
        setUser(data.currentUser);
      }
    })();
  }, []);
  return (
    <Router>
      <Switch>
        <Route
          component={() => <AuthForm formType='signin' />}
          exact
          path='/signin'
        ></Route>
        <Route exact path='/signup'>
          <AuthForm formType='signup' />
        </Route>
        <Route exact path='/my-account'>
          <MyAccount />
        </Route>
        <Route exact path='/documentation'>
          <Navbar>
            <Documentation />
          </Navbar>
        </Route>
        <Route path='/' component={CellList} />
      </Switch>

      {/* <div>
        <CellList />
      </div> */}
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />{" "}
  </Provider>,
  document.querySelector("#root")
);
