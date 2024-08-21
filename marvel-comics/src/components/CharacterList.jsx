// src/components/CharacterList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './CharacterList.css'; // Comment out or remove this line

const CharacterList = ({ onSelectCharacter }) => {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters`,
                    {
                        params: {
                            ts: 1,
                            apikey: 'your key',
                            hash: 'your hash'
                        }
                    }
                );
                setCharacters(response.data.data.results);
            } catch (error) {
                setError(error);
            }
        };

        fetchCharacters();
    }, []);

    if (error) return <p>Error fetching characters: {error.message}</p>;

    return (
        <div className="character-list">
            {characters.map(character => (
                <div key={character.id} className="character-item" onClick={() => onSelectCharacter(character.id)}>
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                    <p>{character.name}</p>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
