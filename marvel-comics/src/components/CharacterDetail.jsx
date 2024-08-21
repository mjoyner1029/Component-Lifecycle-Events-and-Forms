// src/components/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './CharacterDetail.css'; // Comment out or remove this line

const CharacterDetail = ({ characterId }) => {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!characterId) return;

        const fetchCharacterDetails = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters/${characterId}`,
                    {
                        params: {
                            ts: 1,
                            apikey: 'your key',
                            hash: 'your hash'
                        }
                    }
                );
                setCharacter(response.data.data.results[0]);
            } catch (error) {
                setError(error);
            }
        };

        fetchCharacterDetails();
    }, [characterId]);

    if (error) return <p>Error fetching character details: {error.message}</p>;
    if (!character) return <p>Select a character to see details.</p>;

    return (
        <div className="character-detail">
            <h2>{character.name}</h2>
            <p>{character.description || 'No description available.'}</p>
            <h3>Comics:</h3>
            <ul>
                {character.comics.items.map(comic => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;
