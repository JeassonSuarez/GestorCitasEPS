import React from 'react'
import { ContModulos } from '../../components/container/contenedor-modulos';
import { Footer } from '../../components/pure/footer';
import { Header } from '../../components/pure/header';
import { User } from '../../components/pure/user';
import USER from '../../models/user.enum.js'
import ModuleC  from '../../models/module.class.js'
import { Module } from '../../components/pure/module'

export const SesionMedico = () => {
  const agenda = new ModuleC("CREAR AGENDA", "Crear agenda del mes");
  const calendario = new ModuleC("CALENDARIO", "Consultar citas programadas");
  return (
    <div>
        <Header />
        <User user = { USER }/>
        <hr></hr>
        <ContModulos 
          moduloUno={ <Module titulo={ agenda.titulo } descripcion={ agenda.descripcion }/> } 
          moduloDos={ <Module titulo={ calendario.titulo } descripcion={ calendario.descripcion }/> }/>
        <Footer />
    </div>
  )
}
