import { useEffect, useState } from "react";
import "./PokemonList.css"
import axios from "axios"

import  Pokemon from "../Pokemon/Pokemon";



function PokemonList(){

    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [pokedexUrl,setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    
    async function downloadPokemons(){
        setIsLoading(true)
        const response = await axios.get(pokedexUrl) //this downloads the array of 20 Pokemons.
        

        // we get the array of pokemons from the results
        const pokemonResults = response.data.results;
        // console.log(response)
        // console.log(pokemonResults)

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        // console.log(pokemonResults)

        // iterating over the array of pokemons and using their url to create the promises
        // that will downloads those 20 pokemons. 
         const pokemonResultsPromise = pokemonResults.map( (pokemon) => axios.get(pokemon.url));
        // console.log(pokemonResultsPromise)

        // passing that proise array to axios.all()
        const pokemonData  = await axios.all(pokemonResultsPromise)
        // getting the array of 20 pokemons with complete data 
        // console.log(pokemonData)

        // now iterating on data of each pokemon and extracting the id, name, image and types.
        const PokemonListResult = ( pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            

            return ({
                id : pokemon.id,
                name : pokemon.name,
                image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types : pokemon.types 

            })
        }))
        // console.log(pokemonData)
        setPokemonList(PokemonListResult)
        // console.log(PokemonListResult)
        setIsLoading(false)
    }
    
    useEffect( () =>{
        downloadPokemons()
    }, [pokedexUrl])

    return (
        <div className="pokemonList">
            
            <div className="pokemon-wrapper">
            {(isLoading) ? "loading" : pokemonList.map( (pokeMon) => <Pokemon 
                 name={pokeMon.name} 
                 image={pokeMon.image} 
                 key={pokeMon.id}
                 types={pokeMon.types}
                 id={pokeMon.id} />
                )
            }
            </div>
            <div className="controls">
                <button disabled={prevUrl == null } onClick={() => setPokedexUrl(prevUrl)} >Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)} >Next</button>
            </div>
            
        </div>
    )
}

export default PokemonList;