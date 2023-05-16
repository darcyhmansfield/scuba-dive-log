import { Link } from 'react-router-dom';

// Defining a functional component called Navbar
const Navbar = () => {
  // This component returns a navigation bar with links to various pages
  return (
    <nav className="nav">
      <ul>
        {/* The first list item links to the homepage */}
        <li>
          <Link to="/">🏠</Link>
        </li>
        {/* The second list item links to a page to log a new dive */}
        <li>
          <Link to="/log-dive">Log Dive</Link>
        </li>
        {/* The third list item links to a page to view all dives */}
        <li>
          <Link to="/Dives">View Dives</Link>
        </li>
      {/* The fourth list item contains a link to the search page */}
        <li>
          <Link to="/apitest">🔎</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
