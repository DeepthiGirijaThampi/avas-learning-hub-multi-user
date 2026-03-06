// Importing navigation hooks from React Router
import { useNavigate ,Link } from "react-router";
// Importing the CSS for styling
import './home.css';

// Functional component for the Home page
export default function Home(){
    // Hook from React Router to programmatically navigate between routes
    const navigate = useNavigate();
    
    //rendering
    return(
        <main className="home-page">
            <div className="welcome">
                <h1 style={{display:"flex",justifyContent:"center",color:"#3a5a40"}}>Welcome to Ava’s Learning Hub</h1>
                <p style={{display:"flex",justifyContent:"center", color:"#7BA05B"}}><strong><em>Your personal space to explore, reflect, and grow 🌱</em></strong></p>
            </div>
            <section className="features">
                <Link to={"/subjects"}><div className="feature-card">📚 Track Subjects</div></Link>
                <Link to={"/reflections"}><div className="feature-card">✍ Reflect on Learning</div></Link>
                <Link to={"/profile"}><div className="feature-card">📊 Celebrate Progress</div></Link>
                <div className="feature-card">🌍 Coming soon: multi-user!</div>
            </section>
            <button onClick={() => navigate("/subjects")} className="get-started-button">Get Started</button>
        </main>
    )
}