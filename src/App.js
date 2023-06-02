import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./components/Pokemon";
import axios from "axios";
import pokemon from "./assets/pokemon-team.jpg"

function App() {

    const [pokemonName, setPokemonName] = useState([])
    const [offset, setOffset] = useState(20)

    function handleClickForward() {
        if (offset < 1261) {setOffset(offset + 20)}
    } function handleClickBackward() {
        if (offset > 20) { setOffset(offset - 20)}
    }

    useEffect(() => {

        async function fetchAllPokemons() {

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
           /*     console.log(response.data.results)*/
               /* const pokemon = response.data.results.map((pokemon)=>{
                    return (pokemon.name)
                })*/
                setPokemonName(response.data.results)

            }
            catch(err) {
                console.error(err)
            }
        }
        fetchAllPokemons()
    }, [offset])




  return (
  <>
      <header className={"pokemon-header"}>
          <img src={pokemon} alt={"pokemon team"} width={"100%"}/>
          <div className={"button-wrapper"}>
            <button type="click" onClick={handleClickBackward}>Terug</button>
            <button type="click" onClick={handleClickForward}>Volgende</button>
          </div>
      </header>

      <main className={"pokemon-container"}>
          <div className={"pokemon-card"}>
              {pokemonName.map((pokemon)=>{
                  return <Pokemon pokemonName={pokemon.name}/>
              })}
          </div>
      </main>


  </>
  );
}

export default App;
