//React hooks
import { useEffect, useState } from "react";
//Reusable button component
import CustomButton from "../common/CustomButton";
//CSS styling 
import './learning.css';
import './reflections.css';
// Service functions for API calls
import { getReflectionsByUser, createReflection, deleteReflection } from "../../services/reflectionService";
import { getSubjectsByUser } from "../../services/subjectService";
import { FaTrash } from "react-icons/fa";

//Reflection component to allow users to add, view and delete reflections
export default function Reflections(){
    
    //useState hook for show/hide form
    const [showForm,setShowForm] = useState(false);
    //hook for loadreflections
    const [reflections, setReflections] = useState([]);
    //usestate for new reflection text input
    const [text, setText] = useState('');
    //usestate foe selected subject in dropdown
    const [subject, setSubject] = useState('');
    //usestate foe subject list in dropdown
    const [subjectList, setSubjectList] = useState([]); 

    // Fetch reflections and subjects when component loads
    useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        try {
            // Fetch reflections created by the user
            const reflectionsData = await getReflectionsByUser(userId, token);
            setReflections(reflectionsData);

            // Fetch subjects for dropdown selection
            const subjectsData = await getSubjectsByUser(userId, token);
            setSubjectList(subjectsData);
            } catch (error) {
            console.error("Failed to load reflections or subjects:", error.message);
            }
        };

        fetchData();
    }, []);

    //handler function  handleAddReflections to add new reflections
    const handleAddReflections =async (e)=>{
            e.preventDefault();

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            // Find the selected subject object
            const selectedSubject = subjectList.find((sub) => String(sub.id) === String(subject));

            // Construct reflection object for backend
            const reflectionData = {
            user: { id: Number(userId) },
            subject: selectedSubject ? { id: selectedSubject.id } : null,
            content: text
        };

        try {
            // Save reflection via API
            const savedReflection = await createReflection(reflectionData, token);
            // Add new reflection to UI state
            setReflections((prevReflections) => [...prevReflections, savedReflection]);
            // Reset form fields
            setText("");
            setSubject("");
            setShowForm(false);
        } catch (error) {
            console.error("Failed to save reflection:", error.message);
        }
       
    }

    //handler for deleting a reflection 
    const handleDeleteReflection = async (id)=>{

        const token = localStorage.getItem("token");

    try {
        // Delete reflection from backend
        await deleteReflection(id, token);
        // Remove reflection from UI state
        setReflections((prevReflections) =>
            prevReflections.filter((reflection) => reflection.id !== id)
        );
    } catch (error) {
        console.error("Failed to delete reflection:", error.message);
    }
    }
    //rendering
    return(
      
        <main className="page-container">
                <h1 className="page-heading">Reflections</h1>
                <p style={{textAlign:"center"}}>
                    Write your thoughts about what you learned today ✍
                </p>
                {/*show form when add reflection is clicked */}
                {showForm && (
                    <form className="reflections-form" onSubmit={handleAddReflections}>
                        <textarea 
                            rows={4}
                            placeholder='Your thoughts'
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                            required
                        /><br></br>
                        <select value={subject} onChange={e=>setSubject(e.target.value)}>
                            <option value={""}>--Optional : Select Subject--</option>
                            {subjectList.map((sub)=>(
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))
                            }
                        </select><br/>
                        <CustomButton text="Save Reflection" type = "submit"/>
                    </form>
                )}
                {/* Add Reflection Button only when form is hidden */}
                {!showForm && (
                    <div style={{textAlign:"center"}}>
                        <CustomButton text="Add Reflection" onClick={()=>setShowForm(true)}/>
                    </div>
                )}
                {/* Display reflections */}
                <div className="reflections-container">
                    {reflections.length === 0 ? 
                    (<div style={{textAlign:"center",margin:"1rem",color:"gray"}}>
                        <p>No reflections yet...</p>
                    </div>)
                    :
                    (reflections.map((reflection)=>(
                    <div className="reflection-display" key={reflection.id}>
                    
                        <div className="h3-div">
                        <h3 className="h3-sub">{reflection.subject ? reflection.subject.name : "General Reflection"}</h3>
                        </div>
                         {/* Reflection content */}
                        <div className="reflect-div">
                            <p className="reflect-p">{reflection.content}</p>
                            <small>{new Date(reflection.createdAt).toLocaleDateString()}</small><br></br>
                            <br></br>
                            
                            <FaTrash className="delete-icon" onClick={()=>handleDeleteReflection(reflection.id)}/>    
                        </div>
                    </div>
                     )))}
                </div> 
        </main>
      
    )
}