// import Cat from './components/Cat'
import Navbar from './components/Navbar'
import SeachBar from './components/SearchBar'
import CountryCard from './components/CountryCard'
import './styles/styles.scss'
import { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar />
      <div className="container">
        <SeachBar setSearchTerm={setSearchTerm}/>
        <CountryCard searchTerm={searchTerm}/>
      </div>
    </>
  )
}

export default App
