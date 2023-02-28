//react router dom
import { Link } from "react-router-dom";

//react icons
import { SiRedux } from "react-icons/si";

const Header = () => {
  return (
    <header className="header">
      <div className="flex items-center gap-x-2">
        <h1 className="logo">Redux Blog</h1>
        <SiRedux className="logo" />
      </div>
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
      </nav>
    </header>
  );
};

export default Header;
