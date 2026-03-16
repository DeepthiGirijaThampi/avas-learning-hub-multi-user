// Base URL for all unit-related API endpoints
const API_BASE_URL = "http://localhost:8080/api/units";

//get all units of a particular subject - need token in subjectId and token as params
export async function getUnitsBySubject(subjectId,token) {
    const response = await fetch(`${API_BASE_URL}/by-subject/${subjectId}`,{
        method: "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
        },
    });

    if(!response.ok){
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch units");
    }
    return response.json();
}


//create a new unit under a subject - needs unitData and token as params
export async function createUnit(unitData,token) {
    const response = await fetch(API_BASE_URL,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },

        body : JSON.stringify(unitData),

    });
    if(!response.ok){
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create units");
    }
    return response.json();
}



//update an existing unit - needs unitId,unitData,token as params 
export async function updateUnit(unitId, unitData, token) {
  const response = await fetch(`${API_BASE_URL}/${unitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(unitData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update unit");
  }

  return response.json();
}

//delete a unit by its ID - needs unitId, token as params
export async function deleteUnit(unitId, token) {
  const response = await fetch(`${API_BASE_URL}/${unitId}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete unit");
        }

        return true;
    }