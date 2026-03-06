import CustomButton from '../common/CustomButton';
import './learning.css';
import { useParams,useLocation, Link } from 'react-router';
import { useEffect, useState } from 'react';
import './units.css'
//functional component for Units
export default function Units() {
    // Get subjectId from URL parameters
    const { subjectId } = useParams();
    //receive the subject info here from SubjectCard 
    const location = useLocation();
    const subject = location.state?.subject;

    //load the linit that is saved from local Storage
    const loadLimit = () =>{
        const storedLimit = localStorage.getItem(`unitLimit-${subjectId}`)
        return storedLimit ? parseInt(storedLimit,10) :null;
    }
    //load units that are saved from local storage 
    const loadUnits = ()=>{
        const saved = localStorage.getItem(`units-${subjectId}`);
        return saved? JSON.parse(saved):[]
    }
    //state variables 
    const [units, setUnits] = useState(loadUnits); // setting the units
    const [unitLimit, setUnitLimit] = useState(loadLimit); // setting the limit
    const [showLimitInput, setShowLimitInput] = useState(false); // show the limit input
    const [inputValue, setInputValue] = useState(''); // value entered in limit input
    const [showUnitForm,setShowUnitForm] = useState(false); // show the units form
    const [unitName,setUnitName]= useState('') // to add the unit name
    const [unitDescription,setUnitDescription] = useState(''); // to add the description of unit
    const [error, setError] = useState('');//error message 

    // useEffect to run everytime units or subjectId changes and stores latest units in localStorage
    useEffect(()=>{
        localStorage.setItem(`units-${subjectId}`,JSON.stringify(units))
    },[units,subjectId]);

    //To run every time unitLimit or subjectId changes. and stored the unitLimit to localstorage 
    useEffect(()=>{
        if(unitLimit != null){
            localStorage.setItem(`unitLimit-${subjectId}`,JSON.stringify(unitLimit))
        }
    },[unitLimit,subjectId])

    //handler to show limit input box
    const handleAskLimit = ()=> {
        setShowLimitInput(true);
    }
    //handler to save user provided linit after validation
    const handleLimitSubmit = (e) => {
        e.preventDefault();
        const parsed = parseInt(inputValue, 10);
        if (!isNaN(parsed) && parsed > 0) {
        setUnitLimit(parsed);
        setShowLimitInput(false);
        setError('');
        } else {
        setError('Please enter a valid number.');
        }
    }
    //handler for adding units
    const handleAddUnits =()=> {
        if (units.length >= unitLimit) {
        return;
        }
        setShowUnitForm(true)
    }
    //submit handler for saving the uinit
    const handleSaveUnit = (e)=> {
        e.preventDefault();
        const newUnit = {
        id: Date.now(),
        name: unitName || `Unit ${units.length + 1}`,
        description: unitDescription,
        completed: false
        };
        setUnits([...units, newUnit]);
        setUnitName('');
        setUnitDescription('');
        setShowUnitForm(false);
    }
    // for the checkbox toggle to mark completion of unit
    const toggleUnitComplete =(id) =>{
        const updated = units.map((unit) =>
        unit.id === id ? { ...unit, completed: !unit.completed } : unit
        );
        setUnits(updated);
    }
//rendering starts here
return (
        <main className="page-container">
            <h1 className="page-heading">{ subject ? `${subject.name} Units` : 'Units Page'}</h1>
            {/*Show the “Add Units” initial button */}
            {!unitLimit && !showLimitInput && (
                <div style={{ textAlign: 'center', margin: '1rem' }}>
                <CustomButton text="Add Units" onClick={handleAskLimit} />
                </div>
            )}

            {/* Show input box if they clicked on Add Units */}
            {showLimitInput && (
                <div className="add-units-form">
                <form onSubmit={handleLimitSubmit} >
                    <label>
                        How many units?{' '}
                        <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        min="1"
                        style={{ width: '60px', marginRight: '10px' }}
                        />
                    </label>
                    <CustomButton text="Confirm" type="submit" />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
                </div>
            )}

            {/* Add Unit button after the limit is set */}
            {unitLimit && units.length < unitLimit && (
                <div style={{ textAlign: 'center', margin: '1rem' }}>
                <CustomButton
                    // text={units.length >= unitLimit ? "Limit reached" : "Add Units"}
                    text="Add Units"
                    onClick={handleAddUnits}
                    disabled={units.length >= unitLimit}
                />
                </div>
            )}
            
            {/* Show form to enter unit details */}
            {showUnitForm && (
            <div className="add-units-form">
                <form onSubmit={handleSaveUnit} style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Unit name"
                            value={unitName}
                            onChange={(e) => setUnitName(e.target.value)}
                            style={{ padding: '0.5rem', width: '250px', marginBottom: '0.5rem' }}
                            required
                            />
                    </div>
                    <div>
                        <textarea
                            placeholder="Unit description"
                            value={unitDescription}
                            onChange={(e) => setUnitDescription(e.target.value)}
                            rows="3"
                            style={{ padding: '0.5rem', width: '250px' }}
                        />
                    </div>
                    <CustomButton text="Save Unit" type="submit" />
                </form>
            </div>
            )}

            {/*Show list of units */}
            {unitLimit && units.length === 0 && (
                <p style={{ textAlign: 'center', color: 'gray' }}>No units added yet.</p>
            )}

            {units.length > 0 && (
                <div className='units-container'>
                    <ul className="units-list" style={{ textAlign: 'center', listStyleType:"none" }}>
                    {units.map((unit) => (
                    
                        <li key={unit.id} className='unit-item' >
                        <label className={`unit-label ${unit.completed ? "completed" : ""}`}>
                            <input
                            type="checkbox"
                            checked={unit.completed}
                            onChange={() => toggleUnitComplete(unit.id)}
                            />
                            {unit.name}
                        </label>

                        </li>
                        
                    ))}
                    </ul>
                </div>
            )}

            {/* Link back to subjects */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/subjects" className="link">
                ← Back to Subjects
                </Link>
            </div>
        </main>
    );
}