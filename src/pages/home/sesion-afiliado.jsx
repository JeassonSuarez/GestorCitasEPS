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

  const [user, setUser] = useState({});

  let host = "https://eps-factores.000webhostapp.com?accion=buscar&query=";

  useEffect(() => {
    let query = `SELECT u.n_nombre, u.n_correo, ab.n_tipoAfiliacion, c.i_nombre 
                FROM Usuario u, Afiliado_Beneficiario ab, Categoria c
                WHERE u.k_numeroDocumento = ab.k_numeroDocumento
                    AND ab.k_categoria = c.k_categoria
                
                    AND u.k_numeroDocumento = ${localStorage.getItem('usuario')} `;
    axios.get(host+query)
      .then((res) => JSON.parse(res.data))
      .then((res) => {
        res = JSON.parse(res);
        setUser({
          nombre: res[0],
          correo: res[1],
          tipoAfiliacion: res[2],
          categoria: res[3]
        });
      })
  }, [])

  return (
    <div>
        <Header />
        <User user = { user }/>
        <hr></hr>
        <ContModulos 
          moduloUno = {<Module titulo={ modAsignacionCitas.titulo } descripcion={ modAsignacionCitas.descripcion } link='/asignacionCitas'/>} 
          moduloDos = {<Module titulo={ modCitasProg.titulo } descripcion={ modCitasProg.descripcion } link='/citasAfiliado'/>}/>
        <Footer />
        <MenuHam/>
    </div>
  )
}
