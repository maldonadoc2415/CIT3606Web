import React, { useState, useEffect } from 'react';
import { POKEMON_DATA } from './pokemonData'; // Import the data file

const STORAGE_KEY = 'offlinePokemonDB';

export default function PokemonDatabase() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component mounts to load the data
  useEffect(() => {
    // 1. Check Local Storage for existing data
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      // 2. If data exists, parse it and update the state
      try {
        setPokemonList(JSON.parse(storedData));
      } catch (e) {
        console.error("Error parsing stored data:", e);
        // Fallback to seeding if parsing fails
        seedDatabase();
      }
    } else {
      // 3. If no data exists, seed the database
      seedDatabase();
    }
    setLoading(false);
  }, []);

  // Function to seed the database and update state
  const seedDatabase = () => {
    console.log("Seeding Local Storage with Pokémon data...");
    
    // Store the structured data as a JSON string
    localStorage.setItem(STORAGE_KEY, JSON.stringify(POKEMON_DATA));
    
    // Update the React state
    setPokemonList(POKEMON_DATA);
  };

  if (loading) {
    return <div>Loading offline data...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Offline Pokémon Database </h2>
      
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

// Separate component for clean presentation
const PokemonCard = ({ pokemon }) => (
  <div style={{ 
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    padding: '15px', 
    width: '200px', 
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' 
  }}>
    <h3 style={{ margin: '0 0 10px 0' }}>{pokemon.name} ({pokemon.id})</h3>
    
    {/* Use the image path from the data */}
    <img 
      src={pokemon.image} 
      alt={pokemon.name} 
      style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
    />
    
    <p>
      <strong>Type:</strong> <span style={{ fontWeight: 'bold', color: '#007bff' }}>{pokemon.type}</span>
    </p>
    
    <p style={{ fontSize: '0.9em' }}>
      {pokemon.summary}
    </p>
  </div>
);