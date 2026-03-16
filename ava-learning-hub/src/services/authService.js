// Base URL for authentication-related API endpoints
const API_BASE_URL = "http://localhost:8080/api/auth";

//Function to register a new user 
export async function registerUser(userData){
    
    // Send POST request to backend register endpoint
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

// Function to authenticate an existing user
export async function loginUser(loginData){

    // Send login request to backend
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