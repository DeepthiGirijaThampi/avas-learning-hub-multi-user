// The Footer component to display a consistent footer section across the app
export default function Footer(){
    //get the current year 
    let thisYear = new Date().getFullYear();
    return(
        <footer>
            <div style={{color:"#3a5a40"}}><strong>&copy; {thisYear} Ava's Learning Hub private limited | All rights reserved.</strong></div>
        </footer>
    )
}