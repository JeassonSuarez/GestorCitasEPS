import React from 'react'
import CitaMedicoAgendada from '../pure/citaMedicoAgendada'

const ListaCitasAMedico = () => {
  return (
    <div className='div-lista-citas'>
        <div className="div-conainer-citasA-medico">
                <p>ESPECIALIDAD</p>
                <p>PACIENTE</p>
                <p>FECHA</p>
                <p>SEDE</p>
                <p>MODALIDAD</p>
                <p>TIPO DE CITA</p>
                <p>NO LLEGO PACIENTE</p>
                <p>INICIAR</p>
        </div>
            <CitaMedicoAgendada />
            <CitaMedicoAgendada />
    </div>
  )
}

export default ListaCitasAMedico