import { Link } from "react-router";
import { useState } from 'react';
// The NavMenu component displays a responsive navigation menu
export default function NavMenu(){
  const [menuOpen, setMenuOpen] = useState(false);
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
        <Link className="link" id="links" to="/profile" onClick={() => setMenuOpen(false)} >Profile  </Link>
        <Link className="link" id="links" to="/reflections" onClick={() => setMenuOpen(false)} >Reflections  </Link>
        <Link className="link" id="links" to="/subjects" onClick={() => setMenuOpen(false)} >Subjects  </Link>
        <Link className="link" id="links" to="/contacts" onClick={() => setMenuOpen(false)} >Contact Us  </Link>
      </div>
    </nav>
  )
}