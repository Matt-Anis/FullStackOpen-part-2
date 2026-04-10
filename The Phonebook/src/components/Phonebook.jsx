import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Person from "./Person";
import contactService from "../services/contacts";

const PhoneBook = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("fetching persons from the json-server");

    contactService.getAll().then(returnedContacts => setPersons(returnedContacts));
  }, []);

  const handleConactDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      contactService.deleteContact(person.id)
      .then(() => setPersons(persons.filter(currentPerson => !(currentPerson.id === person.id))))
    }
  };

  const [filter, setFilter] = useState("");
  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleConactDelete}/>
      ))}
    </div>
  );
};

export default PhoneBook;
