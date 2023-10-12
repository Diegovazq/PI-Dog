import React from 'react';
import { getDogDetail, resetDetail } from '../../redux/actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams} from 'react-router-dom';

import './Detail.css';

const Detail = () => {
  let dispatch = useDispatch();
  let { id } = useParams();
  const dogDetail = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id))
    return()=>{
      dispatch(resetDetail())
    }
  }, [dispatch, id])

  return (
    <div className='mainContainer-Detail' >
      <img src={dogDetail?.image ? dogDetail.image : "img"} alt="img"/>
      <h3>ID: {dogDetail?.id}</h3>
      <h1>Raza: {dogDetail?.name}</h1>
      <h3>Peso:</h3>
      <span>Mínimo: {dogDetail?.weightMin}</span> - <span>Máximo: {dogDetail?.weightMax}</span>
      <h3>Peso promedio: {dogDetail?.averageWeight}</h3>
      <h3>Altura (mínimo - máximo): {dogDetail?.height}</h3> {/* sin el .metric me lo trae */}
      <h3>Esperanza de Vida: {dogDetail?.life_span}</h3>
      <h3>Temperamento: {dogDetail?.temperament}</h3>
     
    </div>
  )
}

export default Detail;
