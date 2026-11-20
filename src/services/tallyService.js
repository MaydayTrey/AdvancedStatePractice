const baseUrl = 'http://localhost:3001/tallies'

//Establish the base URL, then implement the behavior with the Fetch API.
//This prevents dependencies which Axios may rely on.

const getAll = async () => {
    const response = await fetch(baseUrl) //Defaults to GET
    if(!response.ok){
        throw new Error('Failed to retrieve the tallies.') //Manual error handling
    }
    const data = response.json() //Turn the JSON into JS Objects.
    return data
}

const createNewLabel = async (label) => {

    const labelCreated = {
        label,
        count: 0
    }

    const response = await fetch(baseUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(labelCreated)
    })
    
    if(!response.ok){
        throw new Error('Failed to create a new tally!')
    }

    const data = await response.json()
    return data //We need response.json here, during the POST because the server has the identity data we need.
 
}

const update = async (id, tally) => {
    //This has to find the one which we want to update;
    const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(tally)
    }) 
    //That presumes we are passing an object to the update; which will replace the data at that endpoint

    if(!response.ok){
       throw new Error(`Failed to update tally ${id}`)
    }

    const data = await response.json()
    return data 
    //The response data at this would be that new tally, do you actually need this response data? For the id that already exists, or just to show that the update was successful?

}

const remove = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE' //When deleting you do not need headers or body passed.
    })
    if(!response.ok){
        throw new Error(`Failed to delete ${id}`)
    }
}


export default { getAll, createNewLabel, update, remove }
/*
Spec of services;
getAll() --> Fetch all the objects at the endpoint. [X]

createNewLabel(label) --> POST to the endpoint, creating a new object {id, label, count} [X]

update(id, tally) --> PUTs fully updated; to ${baseUrl}/{id}

remove(id) --> delete at ${baseUrl}/{id}

---------
I use my anecdotesServices as reference; 
the functions need to be async.
const getAll = async () => {
    const response = await fetch(baseUrl) //Default GET
    if(!response.ok){ //Must check for failure manually
        throw new Error('Failed to fetch the anecdotes!')
    }
    const data = await response.json() //Must convert the JSON to an object
    return data //Return the data
}

 --> so asynchronous, we have to utilize response, really await and fetch.
 This naturally defaults to GET; then we have to manually check if the response is okay or not, and do error handling
 then the data is response.json - so us converting the JSON to JS Objects. 
 Then return the data to those which utilize the function. 


 When utilizing Fetch, if you want to alter the headers - and the default CRUD method;
 {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
}
This must be passed as the second argument into fetch; you specify the method, the headers, 
and the body - 
*/