import React from 'react';
import { FaHeartbeat, FaBolt, FaShieldAlt, FaTachometerAlt, FaBrain } from 'react-icons/fa';

const PokemonStats = ({ stats }) => {
  const getIcon = (statName) => {
    switch (statName) {
      case 'hp':
        return <FaHeartbeat />;
      case 'attack':
        return <FaBolt />;
      case 'defense':
        return <FaShieldAlt />;
      case 'speed':
        return <FaTachometerAlt/>;
      case 'special-attack':
      case 'special-defense':
        return <FaBrain />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h4>Stats:</h4>
        {stats.map((stat) => (
          <span key={stat.stat.name}>
            {getIcon(stat.stat.name)} {stat.stat.name}: {stat.base_stat}
            <br></br>
          </span>
          
        ))}
    </div>
  );
};

export default PokemonStats;