// Importing navigation hooks from React Router
import { useNavigate ,Link , Navigate} from "react-router";
// Importing the CSS for styling
import './home.css';

import learningImage from "../../assets/learning_002.jpg";

// Functional component for the Home page
export default function Home(){
    // Hook from React Router to programmatically navigate between routes
    const navigate = useNavigate();
    
    // Get token from localStorage to check if user is logged in
    const token = localStorage.getItem("token");

    // If token exists, redirect user away from home page
    if(token){
        return <Navigate to="/subjects" />;
    }

    //rendering
    return(
        <main className="home-page">
         <div className="home-left">
            <div className="welcome">
                <h1 style={{display:"flex",justifyContent:"center",color:"#3a5a40"}}>Welcome to Ava’s Learning Hub</h1>
                <p style={{display:"flex",justifyContent:"center", color:"#7BA05B"}}><strong><em>Your personal space to explore, reflect, and grow 🌱</em></strong></p>
            </div>
            <section className="features">
                <Link to={"/login"}><div className="feature-card">🔐 Login</div></Link>
                <Link to={"/register"}><div className="feature-card">📝 Register</div></Link>
            </section>
            <button onClick={() => navigate("/login")} className="get-started-button">Get Started</button>
        </div>
        <div className="home-right">
                <img src={learningImage} alt="Learning illustration" />
        </div>
        </main>
    )
}