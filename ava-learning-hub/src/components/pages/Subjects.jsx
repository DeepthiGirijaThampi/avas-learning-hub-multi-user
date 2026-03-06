import CustomButton from "../common/CustomButton";
import './learning.css';
import { useEffect, useState } from "react";
import SubjectCard from "../common/SubjectCard";
//Subjects component handles the creation and display of subjects
export default function Subjects(){
    //load the subjects from local storage 
    const loadSubjects = ()=>{
        const saved = localStorage.getItem('subjects');
        return saved ? JSON.parse(saved) : [];
    }

    // useState for setting list of subjects 
    const [subjects,setSubjects] = useState(loadSubjects); 
    // useState for subject name
    const [subjectName,setSubjectName] = useState("") 
    //usestate for subject description
    const [subjectDescription,setSubjectDescription] = useState("") 
    // useEffect to update localStorage whenever the subjects state changes
    useEffect(()=>{
        localStorage.setItem('subjects',JSON.stringify(subjects))
    },[subjects]);
    // Handle form submission to add a new subject
    const handleAddSubject =(e)=>{
        //prevent reaload
        e.preventDefault(); 
        //create a new subject object 
        const newSubject = {
            id: Date.now(),
            name: subjectName,
            description: subjectDescription
        };

        // Update the subjects state with the new subject
        setSubjects([...subjects,newSubject]);
        setSubjectName("");
        setSubjectDescription("");
    }

    //rendering 
    return(
     
    
        <main className="page-container">
            <h1 className="page-heading" style={{display:"flex",justifyContent:"center"}}> Subjects </h1>
            {/* Form for adding a new subject */}
            <form onSubmit={handleAddSubject} className="subject-form">
                <input 
                    value={subjectName}
                    onChange={(e)=> setSubjectName(e.target.value)}
                    placeholder="Subject Name"
                    required
                /> <br/><br/>
                {/* <label>Description </label> */}
                <textarea 
                    value={subjectDescription}
                    onChange={(e)=> setSubjectDescription(e.target.value)}
                    placeholder="Description"
                    required
                /> <br/><br/>
                <CustomButton text={"Add Subject"} type="submit" />
            </form>
        {/* Display all added subjects or a fallback message */}
            <div className="subjects-container">
            {subjects.length === 0 ?(
                <p style={{ textAlign: "center", color: "gray" }} >No subjects added yet.</p>
            ):(
                subjects.map((subject)=>(

                    <SubjectCard key={subject.id} subject={subject}/>
                    
                ))
            )}
            </div>
        
        </main>
     
    )
}