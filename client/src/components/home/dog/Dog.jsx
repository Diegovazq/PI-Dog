
import React from 'react';
import { Link } from 'react-router-dom';
import './Dog.css';

const Dog = ({ image, name, temperament,id }) => {
  return (
    <div className='container'>
      <div className='card'>
        <div className='image'>
          <Link to={`/detail/${id}`}>
            <img src={image} alt={name} />
          </Link>
        </div>
        <div className='content'>
          <h3>{name}</h3>
          <p>{temperament}</p>
        </div>
      </div>
    </div>
  );
};

export default Dog;
