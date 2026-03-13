//importing about.css the external style sheet 
import './about.css';
//importing an image to be used in this page
import aboutImage from '../../assets/profile-pic.jpg';
//The About functional component for the About page
export default function About(){
    return(
        <main className='about-page' >
            <section className='about-section'>
                <h2>About Ava’s Learning Hub</h2>
                <p><em>Created by <strong >Deepthi Girija Thampi</strong> as a solo project designed to inspire young learners like Ava 💖 </em></p>
                <p>
                Ava’s Learning Hub is a multi-user web application that allows students to organize their learning by tracking subjects, units, reflections, and progress in one place.
                </p>
                <h3>Current Features</h3>

                    <ul className="about-features">
                    <li>🔐 Secure user registration and login</li>
                    <li>📚 Create and manage subjects</li>
                    <li>📝 Track learning units within each subject</li>
                    <li>💭 Write personal learning reflections</li>
                    <li>📊 View progress for each subject</li>
                    <li>👤 Each user sees only their own learning data</li>
                    </ul>
                    <p>
                    This project demonstrates full-stack development using React for the frontend and a Spring Boot backend with a database to store user learning data.
                    </p>
                    <p className="about-tech">
                    Technologies used: React, Spring Boot, REST APIs, JWT Authentication, and MySQL.
                    </p>
            </section>
            <section className='about-right'>
                <img className='about-picture' src={aboutImage} alt="Deepthi's picture" />
            </section>
        </main>
    )
}