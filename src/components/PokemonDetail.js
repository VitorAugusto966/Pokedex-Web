import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css';
import PokemonStats from './PokemonStats';
import { FaWater, FaFire, FaLeaf, FaBug, FaGhost, FaDragon, FaPoop } from 'react-icons/fa';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        switch (response.data.types[0].type.name) {
          case 'water':
            setIcon(<FaWater />);
            break;
          case 'fire':
            setIcon(<FaFire />);
            break;
          case 'grass':
            setIcon(<FaLeaf />);
            break;
          case 'bug':
            setIcon(<FaBug />);
            break;
          case 'ghost':
            setIcon(<FaGhost />);
            break;
          case 'dragon':
            setIcon(<FaDragon />);
            break;
          default:
            setIcon(<FaPoop />);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-detail">
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <Card className="mb-4" id="detail">
        <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
        <Card.Body>
          <Card.Text>
            <span>Type:</span> {icon} {pokemon.types[0].type.name}
          </Card.Text>
          <Card.Text>
        <PokemonStats stats={pokemon.stats} />
        </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PokemonDetail;
