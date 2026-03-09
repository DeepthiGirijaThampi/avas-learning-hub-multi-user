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
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <main className="page-container">
      <h1 className="page-heading">Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
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
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <br /><br />

        <CustomButton text="Register" type="submit" />
      </form>
    </main>
  );
}