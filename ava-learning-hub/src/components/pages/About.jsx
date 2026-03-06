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
                <p><em>Created by <strong >Deepthi Girija Thampi</strong>, as part of a solo project to inspire young learners like Ava 🧡</em></p>
                <p>
                This solo project is a React-based web application built with love and creativity — and will grow to support
                multiple users in the future.
                </p>
                <p>
                Current features include tracking subjects, units, reflections, and more. Stay tuned for future enhancements!
                </p>
            </section>
            <section className='about-right'>
                <img className='about-picture' src={aboutImage} alt="Deepthi's picture" />
            </section>
        </main>
    )
}