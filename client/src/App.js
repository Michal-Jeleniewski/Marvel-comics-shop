import './App.css';
import { useState, useEffect } from 'react'
import Hero_searchbar from './components/Hero_searchbar'


function App() {
  const [heroes, setHeroes] = useState("")
  const [comics, setComics] = useState("")
  const [heroSearch, setHeroSearch] = useState("")
  const [showHeroesRec, setShowHeroesRec] = useState(false)

  function handleGlobalClick(e) {
    console.log(e.target)
    if (e.target.className !== "hero_search") {
      setShowHeroesRec(false)
    }
  }

  useEffect(() => {
    if (heroes === "") {
      const getHeroes = async () => {
        const response = await fetch('http://localhost:5000/heroes')
        const data = await response.json();
        setHeroes(data)
      }
      getHeroes()
    }
    if (comics === "") {
      const getComics = async () => {
        const response = await fetch('http://localhost:5000/comics');
        const data = await response.json();
        setComics(data)
      }
      getComics()
    }
  })
  console.log(comics, heroes)

  return (
    <div onClick={(e) => handleGlobalClick(e)} className="App">
      <Hero_searchbar setHeroSearch={setHeroSearch} heroSearch={heroSearch} heroes={heroes} setShowHeroesRec={setShowHeroesRec} showHeroesRec={showHeroesRec} />
    </div>
  );
}

export default App;