// Importing necessary React hooks and components
import {useEffect, useState } from "react"
import CustomButton from "../common/CustomButton"
import './contact.css'
// Functional component for the Contact Us page
export default function Contacts(){
    // State to track whether the form was submitted
    const [submitted, setSubmitted] = useState(false);
    // State to manage input field values for name, email, and message
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        message: ""
    });
    
    //Handler to update contactData state as the user types in the form
    const handleChange = (e)=>{
        const {name,value} =  e.target;
        setContactData( prev => ({
            ...prev,
            [name]:value
        }));
    };
    // Handler for form submission
    const handleFormSubmit = (e)=>{
        // Prevent page reload
        e.preventDefault();
        setContactData({
        name : "",
        email : "",
        message: ""
    });
    setSubmitted(true);
    }
    // useEffect to clear the thank you message after 4 seconds
    useEffect(() => {
        if (submitted) {
          const timer = setTimeout(() => setSubmitted(false), 4000);
          return () => clearTimeout(timer);
        }
      }, [submitted]);

    //rendering
    return(
        <main className="contact ">
            <div>
        
                <h1 className="page-heading">Contact Us</h1>
                <form onSubmit={handleFormSubmit}>
                    <label>Name </label><input
                    type="text" name="name" 
                    value={contactData.name} 
                    onChange={handleChange} 
                    className="contact-name" 
                    required
                    />
                    <label>Email </label><input 
                    type="email" 
                    name="email" 
                    value={contactData.email} 
                    onChange={handleChange} 
                    className="contact-email" 
                    required
                    />
                    <label>Message:</label>
                    <textarea 
                    name="message" 
                    rows={4}
                    value={contactData.message} 
                    onChange={handleChange} 
                    className="contact-message" 
                    required
                    ></textarea>
                    <CustomButton text = "Submit" type="submit" />
                </form>
                {
                    submitted && (
                        <p className="thankyou">Thank you for your response</p>
                    )
                }
            </div>
        </main>
    )
}