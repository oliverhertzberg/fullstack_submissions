import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(res => {
        setPersons(res.data)
      })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      setNewName('')
      setNewNumber('')
      return (alert(`${newName} already exists in phonebook`))
    }
    personService.create({ name: `${newName}`, number: `${newNumber}` }) 
      .then((res) =>  {
        console.log(res)
        setPersons(persons.concat(res.data))
      })
      .catch((error) => console.log(error))

    alert(`contact: ${newName} was submitted successfully!`)
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = ( contact, e) => {
    e.preventDefault()
    console.log(contact)
    if(window.confirm(`Are you sure you want to delete user: ${contact.name}`)) {
      personService.remove(contact.id)
      .then(setPersons(persons.filter((person) => person.id !== contact.id)))
      .catch((error) => console.log(error))
    }
  }

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value)
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleFilterChange}/>
      <h3>Add a new contact:</h3>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} onClick={handleDelete}/>
    </div>
  )

}

export default App