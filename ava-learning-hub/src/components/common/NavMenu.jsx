// Import navigation tools from React Router
import { Link , useNavigate} from "react-router";
// React hook for managing component state
import { useState } from 'react';

// The NavMenu component displays a responsive navigation menu
export default function NavMenu(){

  // State to control whether the hamburger menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Retrieve authentication details from localStorage
  const token = localStorage.getItem("token"); 
  const userName = localStorage.getItem("userName");

  // Extract the first name to display a friendly greeting
  const firstName = userName ? userName.split(" ")[0] : "";

  //handler for logout
  const handleLogout = () => {
    // Remove stored authentication data  
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  
    // Close the menu
    setMenuOpen(false);

    // Redirect user to login page
    navigate("/login");
};

  // Toggles the menu's open/closed state  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  };

  return(
    <nav className="nav-menu">
      {/* Hamburger button for toggling menu for smaller devices */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      {/* Navigation links */}
      <div className={`menu-links ${menuOpen ? 'show' : ''}`}>
        {/* Public navigation links */}
        {/* <Link className="link" id="links" to="/" onClick={() => setMenuOpen(false)} >Home  </Link> */}
        {!token && (<Link to="/" className="link" onClick={() => setMenuOpen(false)}>Home</Link>)}
        <Link className="link" id="links" to="/about" onClick={() => setMenuOpen(false)} >About  </Link>
        
        {/* Protected links shown only when user is logged in */}
        {token && (
          <>
        <Link className="link" id="links" to="/profile" onClick={() => setMenuOpen(false)} >Profile  </Link>
        <Link className="link" id="links" to="/reflections" onClick={() => setMenuOpen(false)} >Reflections  </Link>
        <Link className="link" id="links" to="/subjects" onClick={() => setMenuOpen(false)} >Subjects  </Link>
        </>
        )}
        {/* Contact page accessible to all users */}
        <Link className="link" id="links" to="/contacts" onClick={() => setMenuOpen(false)} >Contact Us  </Link>
        {/* Conditional rendering based on authentication */}
        {token ? (<>
                  <span> Hello {firstName} 👋 </span>
                  <button className="link" onClick={() => {handleLogout();
                                                          setMenuOpen(false);
                                                          }}>Logout</button>
                  </>                                        
                  ) : (
                  <>
                    <Link className="link" id="links" to="/login" onClick={() => setMenuOpen(false)}> Login </Link>
                    <Link className="link" id="links" to="/register" onClick={() => setMenuOpen(false)}> Register </Link>
                  </>
        )}
      </div>
    </nav>
  )
}