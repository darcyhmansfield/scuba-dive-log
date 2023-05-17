import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './Search_Bar';
import { useNavigate } from 'react-router-dom';
import logo1 from '../images/logo1.png'
import { supabase } from '../config/supabaseClient';

// Defining a functional component called Navbar
const Navbar = ({ session }) => {

  const [results, setResults] = useState({});
  const navigate = useNavigate()
  
  const _handleSearch = (q) => {
    props.Search(q)
    navigate('/divesite-search')
  }

  // This component returns a navigation bar with links to various pages
  return (
    <nav className="nav">
      {/* This inserts the logo and sets it as a link to the home page */}
      <a href="/">
        <img src={logo1} alt="logo" id="logo" />
      </a>
      <ul>
        {session ? (
          <div>
            <li>
              <Link to="/log-dive">Log Dive</Link>
            </li>
            <li>
              <Link to="/Dives">View Dives</Link>
            </li>
            <li>
                <Link to="/account">Profile</Link>
            </li>
            <li>
                <Link to="/account" onClick={() => supabase.auth.signOut()}>Logout</Link>
            </li>
            <li>
              <SearchBar onSubmit={ _handleSearch }/>
            </li>
          </div>
        ) : (
          <div>
            <li>
              <Link to="/account" >Login</Link>
            </li>
            <li>
              <Link to="/register" >Register</Link>
            </li>
            <li>
              <SearchBar onSubmit={ _handleSearch }/>
            </li>
          </div>
        )}
        
      </ul>
    </nav>
  );
};

export default Navbar;
