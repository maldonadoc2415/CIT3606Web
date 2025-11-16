import React, { useState } from 'react';
import './App.css';

let pokemon = [
  {
    mon: "Pikachu",
    img: "images/pikachu.png",
    type: "Electric",
    id: 25,
    summary: "Pikachu's that can generate powerful electricity have cheek sacs that are extra soft and super stretchy."
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

function PokemonGrabber() {
  const [mon, setMon] = useState("pikachu");
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setMon(e.target.value.toLowerCase());
  };

  const handleFetch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${mon}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        return response.json();
      })
      .then(data => {
        setImage(data.sprites.front_default);
      })
      .catch(err => {
        console.error(err);
        setImage(""); 

        
      });
  };

  return (
    <div className="Pokemon-card">
      <input
        value={mon}
        onChange={handleChange}
        type="text"
        placeholder="Who's that Pokémon?"
        
      />
      <button onClick={handleFetch}>Fetch Pokémon</button>
      <p>{mon}</p>
      {image && <img alt={mon} src={image} />}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to the Pokedex App!
        <PokemonGrabber />
        <div className="Pokedex">
          {pokemon.map((poke) => (
            <div key={poke.id} className="Pokemon-card">
              <h2>{poke.mon}</h2>
              <img className="pokeImage" src={poke.img} alt={poke.mon} />
              <li><strong>Type:</strong> {poke.type}</li>
              <li>ID: {poke.id}</li>
              <p className="App-p">{poke.summary}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
