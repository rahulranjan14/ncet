const { API } = require("../backend")
 
export const submitTest = (userId, token, details) => {
    // console.log("submitTest trigerred")
    // console.log("submission data", details)
    return fetch(`${API}/test/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))

}


export const getSubmissions = (userId, token, testId) => {
    // console.log("get submissions")
    return fetch(`${API}/test/testSubmissions/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(testId)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))

}

