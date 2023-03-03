//react
import { useRef, useState, useEffect } from "react";

//react router dom
import { useNavigate } from "react-router-dom";

//react redux
import { useDispatch } from "react-redux";

//actions
import { setCredentials } from "../features/auth/authSlice";

//mutations
import { useLoginMutation } from "../features/auth/authApiSlice";

//components
import Loader from "./Loader";

const Login = () => {
  //ref variables
  const userRef = useRef();
  const errRef = useRef();

  //state variables
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //react router navigate
  const navigate = useNavigate();

  //redux dispatch
  const dispatch = useDispatch();

  //mutations
  const [login, { isLoading }] = useLoginMutation();

  //useEffect
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  //functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();

      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);
  const content = isLoading ? (
    <section>
      <Loader />
    </section>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Employee Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={pwd}
          onChange={handlePwdInput}
          autoComplete="off"
          required
        />
        <button>Sing In</button>
      </form>
    </section>
  );

  return content;
};

export default Login;
