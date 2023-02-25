//react redux
import { useDispatch, useSelector } from "react-redux";

//react router dom
import { Link } from "react-router-dom";

//selectors
import { getCount } from "../features/posts/postsSlice";

//actions
import { increaseCount } from "../features/posts/postsSlice";

const Header = () => {
  //redux dispatch
  const dispatch = useDispatch();

  //redux selectors
  const count = useSelector(getCount);

  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
          <li>
            <Link to="user">Users</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  );
};

export default Header;
