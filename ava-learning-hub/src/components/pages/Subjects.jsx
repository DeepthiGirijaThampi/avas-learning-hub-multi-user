import CustomButton from "../common/CustomButton";
import './learning.css';
import { useEffect, useState } from "react";
import SubjectCard from "../common/SubjectCard";
import { getSubjectsByUser, createSubject, deleteSubject, editSubject} from "../../services/subjectService";

//Subjects component handles the creation and display of subjects
export default function Subjects(){
    
    // useState for setting list of subjects 
    const [subjects,setSubjects] = useState([]); 
    // useState for subject name
    const [subjectName,setSubjectName] = useState("") 
    //usestate for subject description
    const [subjectDescription,setSubjectDescription] = useState("") 
    //confirn delete
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    //subject edit
    const [editingSubject, setEditingSubject] = useState(null);

    //useEffect to load subjects from the backend 
    useEffect(()=>{
        const  fetchSubjects = async () =>{
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            try{
                const data = await getSubjectsByUser(userId,token);
                setSubjects(data);

            }catch(error){
                console.error("Failed to load subjects:", error.message);
            }
        }

        fetchSubjects();
    },[])


    //edit handler 
    const handleEditSubject = (subject) => {
        setEditingSubject(subject);
        setSubjectName(subject.name);
        setSubjectDescription(subject.description);
    }

    // Handle form submission to add a new subject
    const handleAddSubject = async (e)=>{
        //prevent reaload
        e.preventDefault(); 
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const subjectData = {
            user: { id: Number(userId)},
            name : subjectName,
            description: subjectDescription
        };

        try{
            if (editingSubject) {

            const updatedSubject = await editSubject(
            editingSubject.id,
            subjectData,
            token
            );

            setSubjects((prevSubjects) =>
            prevSubjects.map((s) =>
                s.id === editingSubject.id ? updatedSubject : s
            )
             );

            setEditingSubject(null);
            setSubjectName("");
            setSubjectDescription("");
         }else{
            const savedSubject = await createSubject(subjectData,token);
            // setSubjects([...subjects,savedSubject]);
            setSubjects((prevSubjects) => [...prevSubjects, savedSubject]);
            setSubjectName("");
            setSubjectDescription("");
         }   
        }catch(error){
            console.error("Failed to add subject:", error.message);
        }
        
    }

    //detete subject 
    const handleDeleteSubject = async (subjectId) => {
    const token = localStorage.getItem("token");

    try {
        await deleteSubject(subjectId, token);

        setSubjects((prevSubjects) =>
            prevSubjects.filter((subject) => subject.id !== subjectId)
        );
        setConfirmDeleteId(null);
    } catch (error) {
        console.error("Failed to delete subject:", error.message);
    }
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
                <CustomButton text={editingSubject? "Update Subject" : "Add Subject"} type="submit" />
            </form>
        {/* Display all added subjects or a fallback message */}
            <div className="subjects-container">
            {subjects.length === 0 ?(
                <p style={{ textAlign: "center", color: "gray" }} >No subjects added yet.</p>
            ):(
                subjects.map((subject)=>(

                    <div key={subject.id} className="subject-item">
                        <SubjectCard subject={subject} 
                        onDelete={() => setConfirmDeleteId(subject.id)}
                        onEdit={() => handleEditSubject(subject)}
                        />

                        {confirmDeleteId === subject.id && (
                                <div className="delete-confirm-box">
                                    <p>⚠️ Are you sure you want to delete this subject?</p>

                                    <div className="delete-confirm-buttons">
                                        <CustomButton
                                            text="Delete"
                                            onClick={() => handleDeleteSubject(subject.id)}
                                        />
                                        <CustomButton
                                            text="Cancel"
                                            onClick={() => setConfirmDeleteId(null)}
                                        />
                                    </div>
                                </div>
                            ) 
                        }
                        
                    </div>
                    
                    
                ))
            )}
            </div>
        
        </main>
     
    )
}