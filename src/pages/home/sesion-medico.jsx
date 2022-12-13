import React from 'react'
import { useState, useEffect } from 'react';
import { ContModulos } from '../../components/container/contenedor-modulos';
import { Footer } from '../../components/pure/footer';
import { Header } from '../../components/pure/header';
import { User } from '../../components/pure/user';
import USER from '../../models/user.enum.js'
import ModuleC  from '../../models/module.class.js'
import { Module } from '../../components/pure/module'
import MenuHam from '../../components/pure/menuHam';
import axios from 'axios';

export const SesionMedico = () => {
  const agenda = new ModuleC("CREAR AGENDA", "Crear agenda del mes");
  const calendario = new ModuleC("CITAS AGENDADAS", "Consultar citas programadas");
  const calendarioDos = new ModuleC("CITAS NO AGENDADAS", "Consultar citas no programadas");

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
        <User user = { USER }/>
        <hr></hr>
        <ContModulos 
          moduloUno={ <Module titulo={ agenda.titulo } descripcion={ agenda.descripcion } link='/crearAgenda'/> } 
          moduloDos={ <Module titulo={ calendario.titulo } descripcion={ calendario.descripcion } link='/citasAsignadasMedico'/> }
          moduloTres={ <Module titulo={ calendarioDos.titulo } descripcion={ calendarioDos.descripcion } link='/citasDMedico'/> } />
        <Footer />
        <MenuHam />
    </div>
  )
}
