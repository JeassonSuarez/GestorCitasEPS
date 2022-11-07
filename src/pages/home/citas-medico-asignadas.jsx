import React from 'react'
import { ContModulos } from '../../components/container/contenedor-modulos'
import ListaCitasAMedico from '../../components/container/lista-citasA-medico'
import { Footer } from '../../components/pure/footer'
import { Header } from '../../components/pure/header'
import User from '../../components/pure/user'
import USER from '../../models/user.enum'

const CitasMedicoAsignadas = (props) => {
  return (
    <div>
        <Header />
        <User user = { USER }/>
        <hr></hr>
        <h2 style={{width:'95vw', display:'block', margin:'auto', textAlign:'center' }}>{props.tituloModulo}</h2>
        <ContModulos citas={ <ListaCitasAMedico /> }/>
        <Footer />
    </div>
  )
}

export default CitasMedicoAsignadas