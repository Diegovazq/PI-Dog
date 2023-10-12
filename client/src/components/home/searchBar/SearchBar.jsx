import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getName } from '../../../redux/actions/actions';
import './SearchBar.css'

const SearchBar = () => {
  const [dog, setDog] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(getName(event))
  }

  return (
    <div className='mainContainer-SearchBar'>
      <div>
      </div>
      <input className='search-SearchBar'
       type="text" 
       value={dog} 
       placeholder='Buscar raza...' 
       onChange={(event) => { setDog(event.target.value); 
       handleChange(event.target.value) }} />
      <button className='btn-SearchBar' type="submit">Buscar</button>
    </div>
  )
}

export default SearchBar;
