import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import axios from "axios";
import CellList from "./components/cell-list";
import AuthForm from "./components/auth-form";
import { Provider } from "react-redux";
import { store } from "./redux";
import { useActions } from "./hooks/use-actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const { setUser } = useActions();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${
          process.env.SERVER_URL || "http://localhost:3005"
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
        <Route exact path="/" component={CellList} />
        <Route
          component={() => <AuthForm formType="signin" />}
          exact
          path="/signin"
        ></Route>
        <Route exact path="/signup">
          <AuthForm formType="signup" />
        </Route>
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
