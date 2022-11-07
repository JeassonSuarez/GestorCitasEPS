import React from 'react'
import '../../styles/contenedor-modulos.css'
export const ContModulos = ({ ...props }) => {

  if (props.filtroCitas === undefined) {
    
  }

  return (
    <div className='ContModulos-div-container'>
      {props.moduloUno}
      {props.moduloDos}
      {props.filtroCitas}
      {props.citas}
    </div>
  )
}
