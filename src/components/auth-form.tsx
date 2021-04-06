import "./auth-form.css";
import { useState, useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { Link, useHistory } from "react-router-dom";
import { useTypedSelector } from "../hooks/use-typed-selector";
import ErrorMessage from "./error-message";

interface AuthFormProps {
  formType: "signin" | "signup";
}
const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signinOrSignup } = useActions();
  const errors = useTypedSelector((state) => state.user.errors);
  const user = useTypedSelector((state) => state.user);
  const loading = useTypedSelector((state) => state.user.loading);
  const emailValidEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordValidEx = /^([a-zA-Z0-9 _-]+)$/;

  const validEmail = emailValidEx.test(email.toLowerCase());
  const validPassword = passwordValidEx.test(password);

  useEffect(() => {
    if (user.id && !errors.length) {
      history.push("/");
    }
  }, [user, errors, history]);
  return (
    <div className='form-background'>
      <div className='form-wrapper'>
        <article className='message is-primary'>
          <div className='message-header'>
            <p>CodeDoc</p>
          </div>
          <div className='message-body'>
            Hello! and welcome to codedoc! signup below to start creating your
            own codedocs, already have an account?{" "}
            <Link to={formType === "signin" ? "/signup" : "/signin"}>
              {formType === "signin" ? "signup here" : "signin here"}
            </Link>
          </div>
        </article>
        {errors[0] && errors[0].message && (
          <ErrorMessage message={errors[0].message} />
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!confirmPassword) {
              signinOrSignup(email, password);
            } else {
              signinOrSignup(email, password, confirmPassword);
            }
          }}
        >
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control has-icons-left has-icons-right'>
              <input
                type='text'
                className={`input is-${validEmail ? "success" : "danger"}`}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-user'></i>
              </span>
              <span className='icon is-small is-right'>
                <i
                  className={`fas fa-${validEmail ? "check" : "times-circle"}`}
                ></i>
              </span>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control has-icons-left has-icons-right'>
              <input
                value={password}
                type='password'
                className={`input is-${
                  validPassword && password.length > 5 ? "success" : "danger"
                }`}
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-key'></i>
              </span>
              <span className='icon is-small is-right'>
                <i
                  className={`fas fa-${
                    validPassword && password.length > 5
                      ? "check"
                      : "times-circle"
                  }`}
                ></i>
              </span>
            </div>
          </div>
          {formType === "signup" && (
            <div className='field'>
              <label className='label'>Confirm Password</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  value={confirmPassword}
                  type='password'
                  className={`input is-${
                    validPassword &&
                    password.length > 5 &&
                    confirmPassword === password
                      ? "success"
                      : "danger"
                  }`}
                  placeholder='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-key'></i>
                </span>
                <span className='icon is-small is-right'>
                  <i
                    className={`fas fa-${
                      validPassword &&
                      password.length > 5 &&
                      confirmPassword === password
                        ? "check"
                        : "times-circle"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
          )}
          <div className='field'>
            <div className='control'>
              {formType === "signin" ? (
                <button
                  type='submit'
                  disabled={!validEmail || !validPassword}
                  className='button is-link'
                >
                  Submit
                </button>
              ) : (
                <button
                  type='submit'
                  disabled={
                    !validEmail ||
                    !validPassword ||
                    confirmPassword !== password
                  }
                  className='button is-link'
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
