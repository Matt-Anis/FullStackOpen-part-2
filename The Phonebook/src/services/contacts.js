import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const createContact = newContactObject => {
    const response = axios.post(baseUrl, newContactObject)    
    return response.then(response => response.data)
}

const getAll = () => {
    const response = axios.get(baseUrl)
    console.log(response.data);
    
    return response.then(response => response.data)
}

export default {createContact, getAll}