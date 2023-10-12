import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"; 
import { createNewDog, getAllTemperaments } from "../../redux/actions/actions";
import Validate from "./Validate.jsx";

import './Form.css';

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments)
  const [inputs, setInputs] = useState({
    name: "",
    height: "",
    life_span: "",
    image: "",
    weightMin: "0",
    weightMax: "0",
    temperaments: [],
  })

  const [error, setErrors] = useState({})

  const handleInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
    setErrors(Validate({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  const handleTemperamentChoices = (event) => {
    let { value } = event.target;
    if (inputs.temperaments.includes(value)) {
      return alert("Los temperamentos no pueden repetirse!")
    }
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, value]
    })
  }

  const handleDelete = (temp) => {
    setInputs({
      ...inputs,
      temperaments: inputs.temperaments.filter(inst => inst !== temp)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewDog(inputs))
    alert("¡Nuevo perro ingresado!")
    setInputs({
      name: "",
      height: "",
      life_span: "",
      image: "",
      weightMin: "0",
      weightMax: "0",
      temperaments: [],
    })

    history.push("/home");
  }

  useEffect(() => {
    dispatch(getAllTemperaments())
  },[ dispatch]);

  return (
    <div className="mainContainer-Form">
      <div className="prueba">
        <h1>Completar la lista del perro:</h1>
        <form>
          <div>
            <h4>Nombre e Imagen</h4>
            <label>Nombre: </label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              placeholder={"Ej: Chulo"}
              onChange={(event) => handleInputs(event)} />
            {error.name && <p>{error.name}</p>}
          </div>
          <div>
            <label>Imagen:</label>
            <input
              type="text"
              name="image"
              value={inputs.image}
              placeholder={"Ej: http://sitioDeLaImagen.jpg"}
              onChange={(event) => handleInputs(event)} />
            {error.image && <p>{error.image}</p>}
          </div>
          <div>
            <h4 className="weight-Form">Peso y Altura:</h4>
            <label>Mínimo:</label>
            <input
              type="number"
              name="weightMin"
              value={inputs.weightMin}
              onChange={(event) => handleInputs(event)} />
            {error.weightMin && <p>{error.weightMin}</p>}
          </div>
          <div>
            <label>Máximo(Kg):</label>
            <input
              type="number"
              name="weightMax"
              value={inputs.weightMax}
              onChange={(event) => handleInputs(event)}
            />
            {error.weightMax && <p>{error.weightMax}</p>}
          </div>
          <div>
            <label>Altura(Cm):</label>
            <input
              type="text"
              name="height"
              value={inputs.height}
              placeholder={"Por ejemplo: 40 - 65"}
              onChange={(event) => handleInputs(event)} />
            {error.height && <p>{error.height}</p>}
          </div>
          <div>
            <label>Esperanza de Vida:</label>
            <input
              type="text"
              name="life_span"
              value={inputs.life_span}
              placeholder={"Por ejemplo: 12 - 17"}
              onChange={(event) => handleInputs(event)} />
            {error.life_span && <p>{error.life_span}</p>}
          </div>
          <h4>Temperamentos:</h4>
          <h4>Cómo crees que podría ser tu Perro?</h4>
          <select multiple={true} value={temperaments} onChange={(event) => handleTemperamentChoices(event)}>
            <option value="all"></option>
            {temperaments.map((temp) => {
              return (
                <option value={temp} key={temp}>
                  {temp}
                </option>
              );
            })}
          </select>
          <ul><div>{inputs.temperaments.map(temp => temp + " ,")}</div></ul>
          <button className="btn-Form" type="submit" onClick={(event) => handleSubmit(event)} disabled={
            error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || error.temperaments || !inputs.name
          }>
            Crear mi Perro
          </button>
        </form>
        <div className="temperamentsMain-Form">
          {inputs.temperaments.map(temp =>
            <div className="temperaments-Form">
              <p>{temp}</p>
              <button onClick={() => { handleDelete(temp) }}>X</button>
            </div>
          )}
        </div>
      </div>
    
    </div>
  )
}

export default Form;
