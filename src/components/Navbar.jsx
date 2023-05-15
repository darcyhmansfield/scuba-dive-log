import { Link } from 'react-router-dom';

// Defining a functional component called Navbar
const Navbar = () => {
  // This component returns a navigation bar with links to various pages
  return (
    <nav className="nav">
      {/* Added a link to the homepage with the class "site-title" */}
      <Link to="/" className="site-title">Dive Track</Link>
      {/* An unordered list of links to other pages */}
      <ul>
        {/* The first list item links to the homepage */}
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* The second list item links to a page to log a new dive */}
        <li>
          <Link to="/newentry">Log Dive</Link>
        </li>
        {/* The third list item links to a page to view all dives */}
        <li>
          <Link to="/index">View Dives</Link>
        </li>
        {/* The fourth list item links to a page to search for dive sites */}
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
