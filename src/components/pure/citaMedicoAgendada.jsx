import React, { useState } from 'react'
import Confirmacion from './confirmacion'
import '../../styles/citas.css'


const CitaMedicoAgendada = () => {

  const [nameClassModalIcita, setNameClassModalIcita] = useState('hidden');
  const [nameClassModalPNoNita, setNameClassModalPNoNita] = useState('hidden');

  const abrirModalICita = (...prarams) => {
    setNameClassModalIcita(prarams[0] || '');
  }  

  const abrirModalNoPaciente = (...prarams) => {
    setNameClassModalPNoNita( prarams[0] || '')
  }



  return (
    <div className="div-conainer-citas cita">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <button className='rojo' onClick = {abrirModalNoPaciente}>X</button>
            <button className='azul' onClick = {abrirModalICita}>Iniciar cita</button>
            <Confirmacion titulo='Confirmar falta de paciente' descripcion='¿Esta seguro de que el paciente no ha llegado a la cita?' nameClassModal={nameClassModalPNoNita} abrirModal={abrirModalNoPaciente} />
            <Confirmacion titulo='Confirmar inicio de cita' descripcion='¿Esta seguro de que desea iniciar esta cita?' nameClassModal={nameClassModalIcita} abrirModal={abrirModalICita} />
        </div>
  )
}

export default CitaMedicoAgendada