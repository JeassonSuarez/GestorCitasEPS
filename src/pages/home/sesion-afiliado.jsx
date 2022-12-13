import React from 'react'
import { ContModulos } from '../../components/container/contenedor-modulos';
import { Footer } from '../../components/pure/footer';
import { Header } from '../../components/pure/header';
import { Module } from '../../components/pure/module';
import { User } from '../../components/pure/user';
import { useEffect, useState } from 'react';
import ModuleC from '../../models/module.class';
import USER from '../../models/user.enum.js'
import MenuHam from '../../components/pure/menuHam'
import axios from 'axios';

export const SesionAfiliado = () => {
  const modAsignacionCitas = new ModuleC("ASIGNACION DE CITAS", "Agende una nueva cita")
  const modCitasProg = new ModuleC("CITAS PROGRAMADAS", "Consultar sus citas programadas")

  let host = "https://eps-factores.000webhostapp.com?accion=buscar&query=";

  useEffect(() => {
    let query = `SELECT n_nombre, `;
  }, [])

  return (
    <div>
        {console.log(modAsignacionCitas.titulo)}
        <Header />
        <User user = { USER }/>
        <hr></hr>
        <ContModulos 
          moduloUno = {<Module titulo={ modAsignacionCitas.titulo } descripcion={ modAsignacionCitas.descripcion } link='/asignacionCitas'/>} 
          moduloDos = {<Module titulo={ modCitasProg.titulo } descripcion={ modCitasProg.descripcion } link='/citasAfiliado'/>}/>
        <Footer />
        <MenuHam/>
    </div>
  )
}
