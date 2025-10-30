import React from 'react';
import './App.css';
import useState from 'react';


const pokemon = [
    {
        mon: "Pikachu",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    type: "Electric",
    id: 25,
    summary: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy."
    },

    {
    mon: "Charmander",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    type: "Fire",
    id: 4,
    summary: "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself."
    },
    {
    mon: "Squirtle",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    type: "Water",
    id: 7,
    summary: "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds."
    },
    {
    mon: "Bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    type: "Grass/Poison",
    id: 1,
    summary: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger."
    }
];



function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to the Pokedex App!
        <div className="Pokedex">
            {pokemon.map((poke) => (
                <div key={poke.id} className="Pokemon-card">
                    <h2>{poke.mon}</h2>
                    <img src={poke.img} alt={poke.mon} />
                    <li><strong>Type:</strong> {poke.type}</li>
                    <li><strong>ID:</strong> {poke.id}</li>
                    <p className="App-p">{poke.summary}</p>
                </div>
            ))}
        </div>
      </header>
        
        
      
    </div>
  );
}

export default App;


