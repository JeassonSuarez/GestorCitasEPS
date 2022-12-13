import './App.css';
import { Loader } from './components/pure/loader';
import { BrowserRouter as Router, Route,  Routes, Navigate } from 'react-router-dom';
import {SesionAfiliado} from '../src/pages/home/sesion-afiliado.jsx'
import {SesionAdmin} from '../src/pages/home/sesion-admin.jsx'
import {SesionMedico} from '../src/pages/home/sesion-medico.jsx'
import { NFP }  from '../src/pages/404/NFP.jsx'
import { AsignacionCitas } from './pages/home/asignacion-citas';
import CitasAfiliado from './pages/home/citas-afiliado';
import CitasDisponibles from './pages/home/citas-disponibles';
import EsperaCitas from './pages/home/espera-citas';
import CrearAgenda from './pages/home/crear-agenda';
import CitasMedicoAsignadas from './pages/home/citas-medico-asignadas';
import CitasDisponiblesMedico from './pages/home/citas-disponibles-medico';
import { Login } from './components/login/login'
import { Registrar } from './components/registrar/registrar'

function RequireAfiliado({children}){
  if(!localStorage.getItem('usuario') && localStorage.getItem('tipoUsuario') !== 'afiliado'){
    return <Navigate to='/' replace={true}/>
  }
  return children;
}
function RequireMedico({children}){
  if(!localStorage.getItem('usuario') && localStorage.getItem('tipoUsuario') !== 'medico'){
    return <Navigate to='/' replace={true}/>
  }
  return children;
}
function RequireAdmin({children}){
  if(!localStorage.getItem('usuario') && localStorage.getItem('tipoUsuario') !== 'admin'){
    return <Navigate to='/' replace={true}/>
  }
  return children;
}

function App() {
  return (
    <div className='app-div'>
      <Router>
        {/* se define el conjunto de rutas */}
        <Routes>
          {/* se esperan las rutas */}
          <Route exact path = '/' element={<Login />} />
          <Route path = '/registrar' element={<Registrar />} />
          <Route path='/loader' element={ <Loader /> }/>
          <Route path='/afiliado' element={ <RequireAfiliado><SesionAfiliado /></RequireAfiliado> }/>
          <Route path='/admin' element={ <RequireAdmin><SesionAdmin /></RequireAdmin> }/>
          <Route path='/medico' element={ <RequireMedico><SesionMedico /></RequireMedico> }/>
          <Route path='/asignacionCitas' element={ <RequireAfiliado><AsignacionCitas tituloModulo='Asignación Citas' /></RequireAfiliado> }/>
          <Route path='/citasAfiliado' element={ <RequireAfiliado><CitasAfiliado tituloModulo='Citas programadas'/></RequireAfiliado> }/>
          <Route path='/citasDisponibles' element={ <RequireAfiliado><CitasDisponibles tituloModulo='Citas disponibles'/></RequireAfiliado> }/>
          <Route path='/esperaCitas' element={ <RequireAfiliado><EsperaCitas tituloModulo='Espera de citas'/></RequireAfiliado> }/>
          <Route path='/crearAgenda' element={ <RequireMedico><CrearAgenda tituloModulo='Crear Agenda'/></RequireMedico> }/>
          <Route path='/citasAsignadasMedico' element={ <RequireMedico><CitasMedicoAsignadas tituloModulo='Lista de citas asignadas'/></RequireMedico> }/>
          <Route path='/citasDMedico' element={ <RequireMedico><CitasDisponiblesMedico tituloModulo='Agenda activa médico'/></RequireMedico> }/>
          <Route path='*' element={<NFP />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
