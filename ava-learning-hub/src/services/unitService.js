const API_BASE_URL = "http://localhost:8080/api/units";

//get unit by subjects need token in subjectId and token as params
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


//create unit - unitData and tokens
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



//update unit - unitId,unitData,token
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

//delete units - unitId, token
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