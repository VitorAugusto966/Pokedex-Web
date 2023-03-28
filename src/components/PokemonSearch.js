import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import PokemonStats from './PokemonStats';
import './PokemonSearch.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const urlBase = 'https://pokeapi.co/api/v2/pokemon';

function PokemonSearch() {
  const [pokemons, setPokemons] = useState();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${urlBase}/pikachu`)
      .then((result) => {
        setPokemons(result.data);
        setLoading(false);
      })

  }, []);

  function search() {
    axios.get(`${urlBase}/${name}`)
      .then((result) => {
        setPokemons(result.data);
        setLoading(false);
        toast.success("Pokemon encontrado!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
        toast.warn("Escreva um nome de pokemon válido!");


      });

  }

  return (
    <div className="teste">
      <ToastContainer
        autoClose={5000}
        position="top-right"
      />




      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.toLowerCase())}
          placeholder="Nome do pokemon"
        />
        <button type="submit" onClick={search}>
          Buscar
        </button>
      </div>

      {pokemons && (
        <div className="pokemon-detail">
          <Card className="mb-4" id="detail">
            <Card.Img variant="top" src={pokemons.sprites.front_default} />
            <Card.Body>
              <Card.Text>
                <span>Type:</span> {pokemons.types[0].type.name}
              </Card.Text>
            </Card.Body>
            <Card.Text>
              <PokemonStats stats={pokemons.stats} />
            </Card.Text>
          </Card>
        </div>
      )}

      {loading && <div><h1>Carregando</h1></div>}
    </div>
  );
}

export default PokemonSearch;
