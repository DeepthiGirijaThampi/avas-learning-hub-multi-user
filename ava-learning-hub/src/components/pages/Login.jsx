import { useState } from "react";
import CustomButton from "../common/CustomButton";
import { loginUser } from "../../services/authService";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) =>{
    e.preventDefault();

    try{
     const data = await loginUser(formData);
     console.log("Login successful",data);   

    }catch(error){
     console.log("Login failed",error.message);
    }
  }

  return (
    <main className="page-container">
      <h1 className="page-heading">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e)=>
            setFormData({...formData,email:e.target.value})
          }
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e)=>
          setFormData({...formData,password:e.target.value})}
        />

        <br/><br/>

        <CustomButton text="Login" type="submit"/>
      </form>

    </main>
  );
}