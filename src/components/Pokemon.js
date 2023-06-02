import {useEffect, useState} from "react";
import axios from "axios";
import './Pokemon.css'

function Pokemon( {pokemonName} ) {

    const [pokemon, setPokemon] = useState({});

  useEffect(() => {

      async function fetchPokemon() {

          try {
              const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
             /* console.log(response.data);*/
              setPokemon(response.data);
          } catch (error) {
              console.error(error)
          }
      }

      if (pokemonName) {
      fetchPokemon();
      }
  }, [pokemonName]) ;

  const {name, moves, weight, abilities, sprites } = pokemon

    return (

            <div className={"pokemon-wrapper"}>
                {Object.keys(pokemon).length > 0 &&
                <>
                <h2>{name}</h2>
                <img src={sprites.front_default} alt={`picture of ${pokemon.name}`}/>
                <h4>Moves: <span>{moves.length}</span></h4>
                <h4>Weight: <span>{weight}</span></h4>
                <ul>Abilities: {abilities.map((ability)=> {
                    return <li>{ability.ability.name}</li>
                })}
                </ul>
                </>
                }
            </div>

    )
}
export default Pokemon;