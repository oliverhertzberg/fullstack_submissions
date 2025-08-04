import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
    })
  } 
  ,[])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      setNewName('')
      setNewNumber('')
      return (alert(`${newName} already exists in phonebook`))
    }
    setPersons([...persons, { name: `${newName}`, number: `${newNumber}`}])
    alert(`contact: ${newName} was submitted successfully!`)
    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} nameFilter={nameFilter}/>
    </div>
  )

}

export default App