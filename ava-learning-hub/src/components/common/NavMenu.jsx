import { Link , useNavigate} from "react-router";
import { useState } from 'react';
// The NavMenu component displays a responsive navigation menu
export default function NavMenu(){
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 
  const userName = localStorage.getItem("userName");
  const firstName = userName ? userName.split(" ")[0] : "";
  //handler for logout
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
 
  setMenuOpen(false);
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
      {/* Navigation links - shown/hidden based on menuOpen state */}
      <div className={`menu-links ${menuOpen ? 'show' : ''}`}>
        <Link className="link" id="links" to="/" onClick={() => setMenuOpen(false)} >Home  </Link>
        <Link className="link" id="links" to="/about" onClick={() => setMenuOpen(false)} >About  </Link>
        
        {token && (
          <>
        <Link className="link" id="links" to="/profile" onClick={() => setMenuOpen(false)} >Profile  </Link>
        <Link className="link" id="links" to="/reflections" onClick={() => setMenuOpen(false)} >Reflections  </Link>
        <Link className="link" id="links" to="/subjects" onClick={() => setMenuOpen(false)} >Subjects  </Link>
        </>
        )}
        <Link className="link" id="links" to="/contacts" onClick={() => setMenuOpen(false)} >Contact Us  </Link>
        {token ? (<>
                  <span className="link"  >Hello {firstName} 👋 </span>
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