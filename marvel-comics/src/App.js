// src/App.jsx
import React, { useState } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import './App.css';

const App = () => {
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    return (
        <div className="app">
            <CharacterList onSelectCharacter={setSelectedCharacterId} />
            <CharacterDetail characterId={selectedCharacterId} />
        </div>
    );
};

export default App;
