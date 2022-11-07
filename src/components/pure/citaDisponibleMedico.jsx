import React, { useState } from 'react'
import Confirmacion from './confirmacion'

const CitaDisponibleMedico = () => {

  const [nameClassModalCancelarC, setNameClassModalCancelarC] = useState('hidden');
  const [nameClassModalModificarC, setNameClassModalModificarC] = useState('hidden');

  const abrirModalCancelar = (...params) => {
    setNameClassModalCancelarC(params[0] || '');
  }
  const abrirModalModificar = (...params) => {
    setNameClassModalModificarC(params[0] || '');
  }

  return (
    <div className="div-conainer-citas cita">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <button type='submit' className='rojo' onClick={abrirModalCancelar}>Cancelar</button>
        <button type='submit' className='azul' onClick={abrirModalModificar}>Modificar</button>
        <Confirmacion titulo='Cancelar cita' descripcion='¿Esta seguro de que desea cancelar esta cita?' nameClassModal={nameClassModalCancelarC} abrirModal={abrirModalCancelar} />
        <Confirmacion titulo='Modificar cita' descripcion='¿Esta seguro de que desea modificar esta cita?' nameClassModal={nameClassModalModificarC} abrirModal={abrirModalModificar} />
    </div>
  )
}

export default CitaDisponibleMedico