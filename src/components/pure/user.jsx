import React from 'react'
import PropTypes from 'prop-types';
import '../../styles/user.css'
import paciente1 from '../../imagenes/user.png';

export const User = ({ user }) => {
  return (
    <div className='user-div-container'>
        <figure className='user-div-container-foto'>
            <img src= {paciente1} alt='paciente' />
        </figure>
        <div className='user-div-container-datos'>
            <h2>Hola, {user.nombre}</h2>
            {localStorage.getItem('tipoUsuario') === 'paciente' && 
            (
              <>
                <b>Tipo de afiliación: </b><p>{user.tipoAfiliacion}</p>
                <b>Categoría: </b><p>{user.categoria}</p>
              </>
            )}
            {localStorage.getItem('tipoUsuario') === 'medico' &&
            (<>
              <b>Especialidad: </b><p>{user.especialidad}</p>
            </>)}
            <b>Correo Electronico: </b><p>{user.correo}</p>
        </div>
    </div>
  )
}

User.propTypes = {
    user: PropTypes.object.isRequired
}

export default User;
