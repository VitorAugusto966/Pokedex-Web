import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PokemonList.css'
import axios from 'axios';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  const urlBase = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    fetch(urlBase)
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results);
        setDisplayedPokemons(data.results.slice(0, 12));
      });
  }, []);

  const handleLoadMore = async () => {
    setDisplayedPokemons(pokemons.slice(0, displayedPokemons.length + 4));

    if (displayedPokemons.length >= pokemons.length) {
      let init = 20 * page;
      await axios.get(`${urlBase}/?offset=${init}&limit=20`)
        .then((result) => {
          const newPokemons = [...pokemons, ...result.data.results];
          setPokemons(newPokemons);
          setPage(page + 1);
        })
    }

    if(displayedPokemons.lenght > 1000){
      setLoadMore(false);
    }
  };


  return (
    <div className="container my-5">
      <div className="row" >
        {displayedPokemons.map(pokemon => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={pokemon.name}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <Link to={`/pokemon/${pokemon.url.split('/')[6]}`}>
                  <Button variant="primary">Ver detalhes</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {loadMore && (
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleLoadMore}>Carregar mais</Button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
