import { Link } from "react-router";
// The SubjectCard Component accepts 'subject' prop and renders its details
export default function SubjectCard({subject}){
    return(
        <div className="subject-card">
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
            {/* Link to the Units page for the selected subject, passing subject data via state */}
            <Link to={`/units/${subject.id}`} state={{subject}}><strong>Go to Units</strong></Link>
        </div>
    )
}