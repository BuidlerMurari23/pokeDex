import { Route, Routes } from "react-router-dom";
import Pokedex from "../assets/Components/Pokedex/Pokedex";
import PokemonDetails from "../assets/Components/PokemonDetails/PokemonDetails";

function CustomRoutes(){

    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/Pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    );
}

export default CustomRoutes;