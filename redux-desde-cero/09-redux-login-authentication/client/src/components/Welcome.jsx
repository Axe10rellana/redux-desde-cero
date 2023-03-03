//react redux
import { useSelector } from "react-redux";

//react router dom
import { Link } from "react-router-dom";

//selectors
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";

const Welcome = () => {
  //selectors
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  //variables
  const welcome = user ? `Welcome ${user}!` : `Welcome!`;
  const tokenAbbr = `${token.slice(0, 9)}...`;
  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        <Link to="/userslist">Go to the Users list</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
