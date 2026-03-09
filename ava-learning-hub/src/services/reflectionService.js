const API_BASE_URL = "http://localhost:8080/api/reflections";

export async function getReflectionsByUser(userId, token) {
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

export async function createReflection(reflectionData, token) {
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

export async function deleteReflection(reflectionId, token) {
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