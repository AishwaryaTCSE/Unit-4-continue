import React, { useEffect, useRef, useState } from 'react';
import CharacterCard from './CharacterCard';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const charactersPerPage = 10;
  const currentPageRef = useRef(1);
  useEffect(() => {
    const fetchCharacters = async () => {
      let allCharacters = [];
      let nextUrl = 'https://rickandmortyapi.com/api/character';

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        nextUrl = data.info.next;
      }

      setCharacters(allCharacters);
      setTotalPages(Math.ceil(allCharacters.length / charactersPerPage));
    };

    fetchCharacters();
  }, []);


  useEffect(() => {
    const start = (currentPageRef.current - 1) * charactersPerPage;
    const end = start + charactersPerPage;
    setPaginatedCharacters(characters.slice(start, end));
  }, [characters]);

  const goToPage = (pageNumber) => {
    currentPageRef.current = pageNumber;
    const start = (pageNumber - 1) * charactersPerPage;
    const end = start + charactersPerPage;
    setPaginatedCharacters(characters.slice(start, end));
  };

  return (
    <div className="app-container">
      <h1>Rick and Morty Characters</h1>
      <div className="character-grid">
        {paginatedCharacters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages).keys()].map((i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              style={{
                backgroundColor:
                  currentPageRef.current === page ? '#4CAF50' : '#f1f1f1',
                color: currentPageRef.current === page ? 'white' : 'black',
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
