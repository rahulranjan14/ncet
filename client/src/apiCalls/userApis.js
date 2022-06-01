 const { API } = require("../backend")
 
export const submitResponse = submission => {
    // console.log("submir response trigerred")
    // console.log("submission data", submission)
    return fetch(`${API}/test/submit`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submission)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))

}


