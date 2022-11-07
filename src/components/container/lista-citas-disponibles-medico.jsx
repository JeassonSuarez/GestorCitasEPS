import React from 'react'
import CitaDisponibleMedico from '../pure/citaDisponibleMedico'

const ListaCitasDisponiblesMedico = () => {
  return (
    <div className='div-lista-citas'>
        <div className="div-conainer-citas-disponibles">
                <p>ESPECIALIDAD</p>
                <p>FECHA</p>
                <p>SEDE</p>
                <p>MODALIDAD</p>
                <p>TIPO DE CITA</p>
                <p>CANCELAR</p>
                <p>MODIFICAR</p>
        </div>
            <CitaDisponibleMedico />
            <CitaDisponibleMedico />
    </div>
  )
}

export default ListaCitasDisponiblesMedico