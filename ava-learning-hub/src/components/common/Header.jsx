//imported NavMenu component 
import NavMenu from "./NavMenu";

// Header component that appears at the top of each page
export default function Header(){
    return(
        <header>
            <h1 className="main-heading" >🎓Ava's Learning Hub📚✏️ </h1>
            <NavMenu></NavMenu>
        </header>
    )
}