//import the css for styling 
import './profile.css'
import avaImg from '../../assets/ava.png';
import { useEffect, useState } from "react";
import { getSubjectsByUser } from "../../services/subjectService";
import { getUnitsBySubject } from "../../services/unitService";
export default function Profile(){
   
    // Get subjects from localStorage

    // const storedSubjects = JSON.parse(localStorage.getItem('subjects'))||[];

    //Get units from localStorage for each subject
    //count total units and completed ones 
    //show in progress bar

    // const subjectProgress = storedSubjects.map( (subject)=>{
    //     const units = JSON.parse(localStorage.getItem(`units-${subject.id}`))||[];
    //     const total = units.length;
    //     const completed = units.filter(unit => unit.completed).length;
    //     const progress = total === 0? 0: Math.round((completed/total)*100);
    //     return{
    //         ...subject,
    //         progress
    // }
    // })

    const [subjectProgress, setSubjectProgress] = useState([]);
    const userName = localStorage.getItem("userName") || "User";
    const userEmail = localStorage.getItem("userEmail") || "No email";
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

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
                    <img src={avaImg} alt="Ava's Avatar" className='avatar-img' />
                    <h2 >{userName}</h2>
                    <div className="profile-info-row">
                        <span className="label">Email : </span>
                        <span className="value">{userEmail}</span>
                    </div>
                    {/* table to display info */}
                    {/* <table className="profile-info-table">
                    <tbody>
                        <tr>
                            <td><strong>Email : </strong></td>
                            <td><strong>{userEmail}</strong></td>
                        </tr> */}
                        {/* <tr>
                            <td><strong>Grade :</strong></td>
                            <td><strong>7th Grade</strong></td>
                        </tr> */}
                        {/* <tr>
                            <td><strong>School :</strong></td>
                            <td><strong>Fort Zumwalt WMS</strong></td>
                        </tr> */}
                    {/* </tbody>
                    </table> */}
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