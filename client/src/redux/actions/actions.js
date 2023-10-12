import axios from "axios";
import {
  FILTER_BY_ORIGIN,
  GET_ALL_BREEDS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_ALL_TEMPS,
  FILTER_BY_TEMPER,
  GET_NAME_DOG,
  GET_DOG_DETAIL,
  // CREATE_DOG,
  RESET_DETAIL,
  GET_NAME,
  SET_CURRENT_PAGE
} from "../action-types/action-types";

export const getAllBreeds = () => {
  return async function (dispatch) {
    const info = await axios("http://localhost:3008/dog");
    return dispatch({
      type: GET_ALL_BREEDS,
      payload: info.data,
    });
  };
};

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};

export const filterByTemper = (payload) => {
  return {
    type: FILTER_BY_TEMPER,
    payload,
  };
};

export function getNameDog(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3008/dog?name=${name}`);
      return dispatch({
        type: GET_NAME_DOG,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getDogDetail = (id) => {
  return async function (dispatch) {
    let dogWithId = await axios(`http://localhost:3008/dog/${id}`);

    return dispatch({
      type: GET_DOG_DETAIL,
      payload: dogWithId.data,
    });
  };
};

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const getAllTemperaments = () => {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3008/temperament");
    let listOfTemperaments = json.data.map((el) => el.name);
    return dispatch({
      type: GET_ALL_TEMPS,
      payload: listOfTemperaments,
    });
  };
};

export const createNewDog = (payload) => {
  return async function (dispatch) {
    let newDog = await axios.post("http://localhost:3008/dog", payload);
    return newDog;
  };
};

export const getName = (name) => {
  return {
    type: GET_NAME,
    payload: name,
  };
};

export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  };
};

export const setCurrentPage= (payload)=> {
  return {
      type: SET_CURRENT_PAGE,
      payload
  }
}
