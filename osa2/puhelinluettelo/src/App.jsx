import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Mr Moon', number: '000-0000000' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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

  const handleNameFilter = (e) => {
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
      <div>filter contacts: <input value={nameFilter} onChange={handleNameFilter}></input></div>
      <form onSubmit={handleSubmit}>
        <h3>add a new contact:</h3>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        {persons.length > 0 && persons
        .filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .map( person => 
          <p key={person.name}>{person.name} {person.number}</p> 
        )}
    </div>
  )

}

export default App