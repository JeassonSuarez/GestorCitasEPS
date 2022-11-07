import React from 'react'
import CitaDisponible from '../pure/citaDisponible'

const ListaCitasDisponibles = () => {
  return (
    <div className='div-lista-citas'>
        <div className="div-conainer-citas-disponibles">
                <p>ESPECIALIDAD</p>
                <p>MÉDICO</p>
                <p>FECHA</p>
                <p>SEDE</p>
                <p>MODALIDAD</p>
                <p>TIPO DE CITA</p>
                <p>TOMAR CITA</p>
        </div>
            <CitaDisponible />
            <CitaDisponible />
    </div>
  )
}

export default ListaCitasDisponibles