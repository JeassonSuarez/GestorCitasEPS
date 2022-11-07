import React from 'react'
import logo from '../../imagenes/logo.PNG'
import '../../styles/module.css'
export const Module = ({titulo, descripcion}) => {
  return (
    <div className='module-div-container'>
        <figure>
            <img src= { logo } alt='modulo' />
        </figure>
        <div>
            <h2 className='module-h2-titulo'>{titulo}</h2>
            <p className='module-p-descripcion'>{descripcion}</p>
        </div>
    </div>
  )
}
