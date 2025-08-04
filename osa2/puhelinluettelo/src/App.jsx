import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Mr Moon' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      setNewName('')
      return (alert(`${newName} already exists in phonebook`))
    }
    setPersons([...persons, { name: `${newName}` }])
    alert(`a name was submitted: ${newName}`)
    setNewName('')
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.length > 0 && persons.map( person => 
          <p key={person.name}>{person.name}</p> 
        )}
    </div>
  )

}

export default App