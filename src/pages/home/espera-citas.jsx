import React from 'react'
import { ContModulos } from '../../components/container/contenedor-modulos'
import { Footer } from '../../components/pure/footer'
import FiltroEsperaCitas from '../../components/pure/forms/filtro-espera-citas'
import { Header } from '../../components/pure/header'
import User from '../../components/pure/user'
import USER from '../../models/user.enum'
import MenuHam from '../../components/pure/menuHam'

const EsperaCitas = (props) => {
  return (
    <div>
        <Header />
        <User user = { USER }/>
        <hr></hr>
        <h2 style={{width:'95vw', display:'block', margin:'auto', textAlign:'center' }}>{props.tituloModulo}</h2>
        <ContModulos citas={ <FiltroEsperaCitas /> }/>
        <Footer />
        <MenuHam/>
    </div>
  )
}

export default EsperaCitas