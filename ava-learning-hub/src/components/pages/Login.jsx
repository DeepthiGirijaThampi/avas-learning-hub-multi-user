import { useState } from "react";
import {useNavigate,Link} from "react-router";
import CustomButton from "../common/CustomButton";
import { loginUser } from "../../services/authService";
import './auth.css';
// Login component handles user authentication
export default function Login() {

  // Hook to navigate to another route after successful login
  const navigate = useNavigate();
  // State to store email and password entered by the user
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  // State to display login error messages
  const [error, setError] = useState(""); 

  // Handler for login form submission
  const handleLogin = async (e) =>{
    e.preventDefault();

    try{
      // Call backend login API
     const data = await loginUser(formData);

     // Store authentication details in localStorage
     localStorage.setItem("token", data.token);
     localStorage.setItem("userId", data.userId);
     localStorage.setItem("userName", data.name);
     localStorage.setItem("userEmail", data.email);

     // Redirect user to Subjects page after successful login
     navigate("/subjects");

    }catch(error){
    //Reset form feilds if login fails
     setFormData({
      email: "",
      password:""
     })
     //display error msg for invalid credentials
     setError("Invalid email or password");
     setTimeout(()=>{
      setError("");
     },3000);
    }
  }

  return (
    <main className="page-container">
    
      <h1 className="page-heading">Login </h1>
      <p className="auth-subtitle">
        Welcome back! Continue your learning journey.
      </p>
      {/* Login form */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e)=>
            setFormData({...formData,email:e.target.value})
          }
          required
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e)=>
          setFormData({...formData,password:e.target.value})}
          required
        />

        <br/><br/>
        {/* Submit button */}
        <CustomButton text="Login" type="submit"/>
        {/* Display error message if login fails */}
        {error && <p className="form-error">{error}</p>}
      </form>
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Don’t have an account? <Link to="/register">Register</Link>
            </p>
            <p className="auth-note">
              Track your subjects, units, reflections, and progress in one place.
            </p>
    </main>
  );
}