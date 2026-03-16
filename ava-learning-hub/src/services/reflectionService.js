// Base URL for all reflection-related API endpoints
const API_BASE_URL = "http://localhost:8080/api/reflections";

// Fetch all reflections belonging to a specific user
export async function getReflectionsByUser(userId, token) {

  // Send GET request to backend with userId
  const response = await fetch(`${API_BASE_URL}/by-user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch reflections");
  }

  return response.json();
}


// Create a new reflection
export async function createReflection(reflectionData, token) {

  // Send POST request with reflection data
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reflectionData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create reflection");
  }

  return response.json();
}

// Delete a reflection by its ID
export async function deleteReflection(reflectionId, token) {

  // Send DELETE request to backend
  const response = await fetch(`${API_BASE_URL}/${reflectionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete reflection");
  }
}