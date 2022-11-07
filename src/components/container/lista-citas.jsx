import React from 'react'
import '../../styles/citas.css'
import CitaAfiliado from '../pure/citaAfiliado'

const ListaCitas = () => {
  return (
    <div className='div-lista-citas'>
        <div className="div-conainer-citas">
                <p>ESPECIALIDAD</p>
                <p>MÉDICO</p>
                <p>FECHA</p>
                <p>SEDE</p>
                <p>MODALIDAD</p>
                <p>TIPO DE CITA</p>
                <p>CANCELACIÓN</p>
                <p>MODIFICACIÓN</p>
        </div>
            <CitaAfiliado />
            <CitaAfiliado />
    </div>
  )
}

export default ListaCitas