const API_BASE_URL = "http://localhost:8080/api/subjects";

//get subject need token in userId as params
export async function getSubjectsByUser(userId, token){
    const response = await fetch(`${API_BASE_URL}/by-user/${userId}`,{
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
        },
    });

    if(!response.ok){
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch subjects");
    }

    return response.json();
}

//create subject need subData and token
export async function createSubject(subjectData, token) {

    const response = await fetch(`${API_BASE_URL}`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
        },
        body : JSON.stringify(subjectData),
    });

    if(!response.ok){
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create subject");
    }
    return response.json();
}

//Delete Subject - subjectId, token
export async function deleteSubject(subjectId, token) {
  const response = await fetch(`${API_BASE_URL}/${subjectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete subject");
  }

  return true;
}