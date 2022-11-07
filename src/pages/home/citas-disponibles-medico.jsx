import React from 'react'
import { ContModulos } from '../../components/container/contenedor-modulos'
import ListaCitas from '../../components/container/lista-citas'
import ListaCitasDisponiblesMedico from '../../components/container/lista-citas-disponibles-medico'
import { Footer } from '../../components/pure/footer'
import { Header } from '../../components/pure/header'
import User from '../../components/pure/user'
import USER from '../../models/user.enum'

const CitasDisponiblesMedico = (props) => {
  return (
    <div>
        <Header />
        <User user = { USER }/>
        <hr></hr>
        <h2 style={{width:'95vw', display:'block', margin:'auto', textAlign:'center' }}>{props.tituloModulo}</h2>
        <ContModulos citas={ <ListaCitasDisponiblesMedico /> }/>
        <Footer />
    </div>
  )
}

export default CitasDisponiblesMedico