import { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./Filter";
import PersonForm from './PersonForm'
import Person from './Person'

const PhoneBook = () => {

  

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log('fetching persons from the json-server');
    
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [filter, setFilter] = useState('')
  const filteredPersons = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person key={person.id} person={person}/>)}
    </div>
  );
};


export default PhoneBook