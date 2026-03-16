// React hooks for managing component state
import { useState } from "react";

// Hook to navigate programmatically
import { useNavigate } from "react-router";

// Reusable button component
import CustomButton from "../common/CustomButton";

// Service function to call backend registration API
import { registerUser } from "../../services/authService";

// CSS for authentication pages
import './auth.css';

// Register component
export default function Register() {

  // Navigation hook to redirect user
  const navigate = useNavigate();

  // State to store form input values
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  // State to display errors
  const [error, setError] = useState("");

  // Handler for registration form submission
  const handleRegister = async (e) => {
    // Prevent page refresh on submit
    e.preventDefault();

    setError("");

    // Validate trimmed username
    if (formData.username.trim().length === 0) {
      setError("Username cannot be empty.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    // Validate trimmed full name
    if (formData.name.trim().length === 0) {
      setError("Name cannot be empty.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    // Validate password and confirm password match
    if(formData.password !== formData.confirmPassword){
      setError("Passwords do not match.");
      setTimeout(()=>{
        setError("");
      },3000);
      return;
    }
    try {
      // Remove confirmPassword before sending data to backend
      const { confirmPassword, ...userData } = formData;

      // Call backend API to register the user
      await registerUser(userData);
    //redirect to login page
      navigate("/login");
    } catch (error) {
      // Display error message returned from backend
      setError(error.message);
      setTimeout(()=>{
        setError("");
      },3000);
      setFormData({
          ...formData,
          password: "",
          confirmPassword: ""
        });
    }
  };

  return (
    <main className="page-container">
      <h1 className="page-heading">Register</h1>
      <p className="auth-subtitle">
        Create an account to track your learning progress.
      </p>
      {/* Display error message if registration fails */}
      {error && (
          <p className="form-error">{error}</p>
        )}
      {/* Registration form */}  
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <br /><br />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          minLength="6"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <br /><br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({...formData,confirmPassword: e.target.value})
          }
          required
        />
        {/* Submit button */}
        <CustomButton text="Register" type="submit" />
      </form>
      <p className="auth-note">
        Create your account to start building your personalized learning dashboard.
      </p>
    </main>
  );
}