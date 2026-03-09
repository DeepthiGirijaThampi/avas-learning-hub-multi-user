
const API_BASE_URL = "http://localhost:8080/api/auth";

//Register
export async function registerUser(userData){
    
    const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if(!response.ok){
     const errorText = await response.text();
     throw new Error(errorText||"Registration failed")
    
  }

  return response.text();
}

//Login
export async function loginUser(loginData){
    const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    });

    if(!response.ok){
        const errorText = await response.text();
        throw new Error(errorText||"Login failed")
    }

    return response.json();
}