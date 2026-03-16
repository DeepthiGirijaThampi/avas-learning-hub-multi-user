//Import the css for styling 
import './profile.css'
// Import avatar images used for profile customization
import avatar1 from '../../assets/ava.png';
import avatar2 from '../../assets/kitty.png';
import avatar3 from '../../assets/women.png';
import avatar4 from '../../assets/boy.png';
import avatar5 from '../../assets/user.png';
// React hooks
import { useEffect, useState } from "react";
// Service functions to fetch subjects and units from backend
import { getSubjectsByUser } from "../../services/subjectService";
import { getUnitsBySubject } from "../../services/unitService";

// Profile component 
export default function Profile(){
   
    //options for avatar personalization
    const avatars = [avatar1,avatar2,avatar3,avatar4,avatar5];

    // Store selected avatar
    const [selectedAvatar, setSelectedAvatar] = useState(localStorage.getItem("avatar")|| avatar5);

    // State to store progress data for each subject
    const [subjectProgress, setSubjectProgress] = useState([]);

    // Retrieve user information from localStorage
    const userName = localStorage.getItem("userName") || "User";
    const userEmail = localStorage.getItem("userEmail") || "No email";
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    //handler for changing avatar and saving selection
    const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("avatar", avatar);
    };

    // Fetch subjects and calculate progress for each subject
    useEffect(() => {
    const fetchProfileData = async () => {
        try {
            const subjects = await getSubjectsByUser(userId, token);

            const progressData = await Promise.all(
                subjects.map(async (subject) => {
                    const units = await getUnitsBySubject(subject.id, token);

                    const total = units.length;
                    const completed = units.filter((unit) => unit.completed).length;
                    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

                    return {
                        ...subject,
                        progress
                    };
                })
            );

            setSubjectProgress(progressData);
        } catch (error) {
            console.error("Failed to load profile data:", error.message);
        }
    };
    // Only fetch data if user is authenticated
    if (userId && token) {
        fetchProfileData();
    }
}, [userId, token]);

   //rendering
    return(
        <main>
            <h1 id="profile-header">My Profile</h1>
            
            <div className="profile-wrapper">
                 {/* Left section: User avatar and personal info */}
                <section className="profile-left">
                    <img src={selectedAvatar} alt="Ava's Avatar" className='avatar-img' />
                <div className="avatar-options">
                    {avatars.map((avatar, index) => (
                        <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className={`avatar-option ${
                            selectedAvatar === avatar ? "selected-avatar" : " "
                        }`}
                        onClick={() => handleAvatarChange(avatar)}
                        />
                    ))}
                </div>
                <h2 >{userName}</h2>
                 <div className="profile-info-row">
                    <span className="label">Email : </span>
                    <span className="value">{userEmail}</span>
                </div>
                    <p className='welcome-ptag' >
                    Welcome back, {userName.split(" ")[0]}! Great progress so far!! 🎉 Here's a quick summary of your learning journey.
                    </p>
                </section>
                {/* Visual separator between profile and progress sections */}
                <div className="vertical-divider"></div>
                {/* Right section: Progress bars for each subject */}
                <section className="profile-right">
                    {subjectProgress.length === 0 ? (
                    <h2 style={{ color: "#7BA05B", fontStyle: "italic", textAlign: "center" }}>
                        <strong> <em> No subjects to display yet. Add a subject to get started!</em></strong> 
                    </h2>
                    ) : 
                    (
                    subjectProgress.map((subject) => (
                    <div className='progress-container-div' key={subject.id} style={{ marginBottom: "2rem" }}>
                    <h3 className='subject-name-header'style={{color:"#7BA05B"}}>{subject.name}</h3>
                    {/* outer progress bar */}
                    <div className='progress-bar-div'>
                        {/* fill portion based on progress */}
                        <div className='progress-percentage-div'
                        style={{
                        height: "100%",
                        width: `${subject.progress}%`,
                        backgroundColor: "#7BA05B",
                        transition: "width 0.5s ease-in-out",
                            }}
                        ></div>
                    </div>
                    <p style={{ marginTop: "0.5rem" , color:"#7BA05B"}} className='progress-percentage-ptag'>{subject.progress}% complete</p>
                    </div>
                    )))}
                </section>
            </div>
        </main>
  
    )
}