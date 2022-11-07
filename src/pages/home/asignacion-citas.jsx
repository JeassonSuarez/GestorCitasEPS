import React from 'react'
import { ContModulos } from '../../components/container/contenedor-modulos'
import { Footer } from '../../components/pure/footer'
import { FiltroCitas } from '../../components/pure/forms/filtro-citas-formik'
import { Header } from '../../components/pure/header'
import User from '../../components/pure/user'
import USER from '../../models/user.enum'

export const AsignacionCitas = (props) => {
  return (
    <div>
        <Header />
        <User user = { USER }/>
        <hr></hr>
        <h2 style={{width:'95vw', display:'block', margin:'auto', textAlign:'center' }}>{props.tituloModulo}</h2>
        <ContModulos filtroCitas = { <FiltroCitas /> }>{<p>Hola</p>}</ContModulos>
        <Footer />
    </div>
  )
}
