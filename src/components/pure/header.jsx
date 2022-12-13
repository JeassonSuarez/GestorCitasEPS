import React from 'react'
import logo from '../../imagenes/logo.PNG'
import '../../styles/header.css'
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
  let navigate = useNavigate();
  return (
    <div className='div-container'>
        <div className='div-container-inf-eps'>
            <figure className=' figure-logo'>
                <img className='img-logo' src= { logo } alt='logo'/>
            </figure>
            <h3>Nombre Clinica</h3>
        </div>
        <div className='div-container-controles'>
          <div className='div-updateData'>
            <p>Actulizar Datos</p>
            <AiOutlineSetting />
          </div>
          <div className='div-logoutSesion'>
            <p onClick={() => {
              localStorage.removeItem('usuario');
              localStorage.removeItem('tipoUsuario');
              navigate('/');
            }}>Cerrar Sesión</p>
            <AiOutlineLogout className='csesion'/>
          </div>
        </div>
    </div>
  )
}
