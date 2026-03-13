import { useState } from "react";
import { useNavigate } from "react-router";
import CustomButton from "../common/CustomButton";
import { registerUser } from "../../services/authService";
import './auth.css';
export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if(formData.password !== formData.confirmPassword){
      console.log("Passwords MissMatch");
      setError("Passwords do not match.");
      setTimeout(()=>{
        setError("");
      },3000);
      return;
    }
    try {
      const { confirmPassword, ...userData } = formData;
      await registerUser(userData);
      // alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      // alert(error.message);
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
    {error && (
        <p className="form-error">{error}</p>
      )}
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

        <CustomButton text="Register" type="submit" />
      </form>
      <p className="auth-note">
        Create your account to start building your personalized learning dashboard.
      </p>
    </main>
  );
}