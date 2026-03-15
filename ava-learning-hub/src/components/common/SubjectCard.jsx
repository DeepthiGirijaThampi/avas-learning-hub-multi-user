import { Link } from "react-router";
import { FaTrash, FaEdit } from "react-icons/fa";
// The SubjectCard Component accepts 'subject, onDelete and onEdit' props and renders its details
export default function SubjectCard({subject, onDelete, onEdit}){
    return(
        <div className="subject-card">
            <div className="card-icons">
                <FaEdit className="edit-icon" onClick={() => onEdit(subject)} />
                <FaTrash className="delete-icon" onClick={onDelete} />
            </div>
            <h3>{subject.name}</h3> 
            
            <p>{subject.description}</p>
            
            {/* Link to the Units page for the selected subject, passing subject data via state */}
            <Link to={`/units/${subject.id}`} state={{subject}}><strong>Go to Units</strong></Link>
            <br></br>
            
        </div>
    )
}