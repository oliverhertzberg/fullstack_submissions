import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

  const makeNotification = (message) => {
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personService.getAll()
      .then(res => {
        setPersons(res.data)
      })
      .catch(error => {
        console.log(error)
        makeNotification(`Error: failed to retrieve phonebook contacts!`)
      })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const personExists = persons.find(person => person.name === newName)
    console.log('personExists = ', personExists)
    if (personExists && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(
            personExists.id, 
            {...personExists, number: `${newNumber}`})
          .then(res => {
            makeNotification(`Successfully updated number for ${newName}`)
            setPersons(persons.map((person) => {
            return person.id !== personExists.id ? person : res.data
          }))})
          .catch(error => {
            console.log(error)
            const errMsg = error.response?.data?.error || error.message
            makeNotification(`Error: ${errMsg}`)
        })
    } else if (!personExists) {
      console.log('personExists = ', personExists)
      personService.create({ name: `${newName}`, number: `${newNumber}` }) 
        .then((res) => {
          setPersons(persons.concat(res.data))
          makeNotification(`Contact created!`)
        })
        .catch((error) => {
          console.log(error)
          const errMsg = error.response?.data?.error || error.message
          makeNotification(`Error: ${errMsg}!`)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = ( contact, e) => {
    e.preventDefault()
    console.log(contact)
    if(window.confirm(`Are you sure you want to delete user: ${contact.name}`)) {
      personService.remove(contact.id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== contact.id))
        makeNotification(`Successfully deleted contact!`)
      })
      .catch((error) => {
        console.log(error)
        const errMsg = error.response?.data?.error || error.message
        makeNotification(`Error: ${errMsg}`)
      })
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
      <Notification message={notifMessage}/>
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