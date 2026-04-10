import { useState } from "react";
import contactService from "../services/contacts";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const compareNames = (name1, name2) => {
    return name1.toLowerCase() === name2.toLowerCase()
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const oldPerson = persons.find(
      (person) => compareNames(person.name, newName)
    );
    if (oldPerson !== undefined) {
      if (
        window.confirm(
          `"${newName}" already exists, replace the new phone number?`,
        )
      ) {
        contactService.updatePhoneNumber(oldPerson.id, personObject)
        .then(() => contactService.getAll().then(contacts => setPersons(contacts)))
      }
    } else {
      contactService.createContact(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addNewPerson}>
      <h2>Add a new person</h2>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
