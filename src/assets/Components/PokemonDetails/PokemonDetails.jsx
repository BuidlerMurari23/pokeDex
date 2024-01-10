import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css"

function PokemonDetails(){
    const {id} = useParams();
    console.log({id})
    const [pokemon, setPokemon] = useState({});

    async function downloadPokemonDetails(){

        const responses = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(responses);

        setPokemon( {
            name: responses.data.name,
            image: responses.data.sprites.other.dream_world.front_default,
            types: responses.data.types.map((t) => t.type.name),
            height: responses.data.height,
            weight: responses.data.weight
        })
    }


    useEffect( () => {
        downloadPokemonDetails()
    },[])

    return (
        <div className="pokemonDetails-wrapper">

            <div>
                <img className="pokemonDetails-image" src={pokemon.image} />
            </div>
            <div className="pokemonDetails-name" > Name : <span>{pokemon.name}</span> </div>
            
            
            
            
            <div className="pokemonDetails-name"> Height : {pokemon.height} </div>
            <div className="pokemonDetails-name"> Weight : {pokemon.weight} </div>
            <div className="pokemonDetails-types" >
               <span>Type : </span> {pokemon.types && pokemon.types.map( (type) => <div key={type}>{type}</div> )}
            </div>
        </div>
    )

}

export default PokemonDetails;