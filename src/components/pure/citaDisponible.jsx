import React, { useState } from 'react'
import Confirmacion from './confirmacion';

const CitaDisponible = (props) => {

  const [nameClassModalTCita, setNameClassModalTCita] = useState('hidden');

  const abrirModalTomarCita = (...params) => {
    setNameClassModalTCita(params[0] || '');
  }


  return (
    <div className="div-conainer-citas cita">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <button type='submit' className='azul' onClick={abrirModalTomarCita}>Tomar Cita</button>
        <Confirmacion titulo='Tomar cita' descripcion='¿Esta seguro de que desea tomar esta cita?' nameClassModal={nameClassModalTCita} abrirModal={abrirModalTomarCita} />
    </div>
  )
}

export default CitaDisponible