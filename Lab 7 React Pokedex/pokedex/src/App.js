import React from 'react';
import './App.css';



const pokemon = [
    {
        mon: "Pikachu",
    img: "images/pikachu.png",
    type: "Electric",
    id: 25,
    summary: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy."
    },

    {
    mon: "Charmander",
    img: "images/charmander.png",
    type: "Fire",
    id: 4,
    summary: "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself."
    },
    {
    mon: "Squirtle",
    img: "images/squirtle.png",
    type: "Water",
    id: 7,
    summary: "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds."
    },
    {
    mon: "Bulbasaur",
    img: "images/bulbasaur.png",
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
                    <img className="pokeImage"src={poke.img} alt={poke.mon} />
                    <li><strong>Type:</strong> {poke.type}</li>
                    <li>ID:{poke.id}</li>
                    <p className="App-p">{poke.summary}</p>
                </div>
            ))}
        </div>
      </header>
        
        
      
    </div>
  );
}

export default App;


