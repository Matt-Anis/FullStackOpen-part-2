import { useState } from "react";
import Filter from "./Filter";
import PersonForm from './PersonForm'
import Person from './Person'

const PhoneBook = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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