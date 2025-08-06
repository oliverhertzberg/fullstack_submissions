import { useState, useEffect, useRef } from 'react'

import countryService from './services/countriesService'
import SearchBar from './components/SearchBar'
import Matches from './components/Matches'
import Weather from './components/Weather'


const App = () => {
  const [matches, setMatches] = useState(null)
  const [search, setSearch] = useState('')
  const countries = useRef(null)


  countryService.getAll()
    .then(res => {
      countries.current = res.data
    })
    .catch(err => console.log(err))
  

  useEffect(() => {
    if (!countries.current) return
    if (search === '' || search === ' ') {
      setMatches(null)
      return
    }
    setMatches(countries.current.filter((item) => item.name.common.toLowerCase().includes(search.toLowerCase())))
  },[search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const showCountry = (match) => {
    setMatches([match])
  }

  return (
    <div>
      <SearchBar value={search} onChange={handleSearch}/>
      <Matches matches={matches} onClick={showCountry}/>
      <Weather matches={matches} />
    </div>
  )
}

export default App