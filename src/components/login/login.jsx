import "./login.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();
  const initialValues = {
    tipoUsuario: "seleccionar",
    usuario: "",
    contrasena: "",
  };

  const validate = (values) => {
    let errors = {};

    if (values.tipoUsuario === "seleccionar")
      errors.tipoUsuario = "Elija un tipo de usuario";
    if (!values.usuario) errors.usuario = "Se debe ingresar el usuario";
    if (values.contrasena?.length < 6 || !values.contrasena?.length > 16)
      errors.contrasena = "La contraseña debe tener entre 6 y 16 caracteres";

    return errors;
  };

  const onSubmit = () => {
    let host = "https://eps-factores.000webhostapp.com?accion=buscar&query=";
    let query = `SELECT k_tipoDocumento, k_numeroDocumento 
                  FROM Usuario 
                  WHERE k_numeroDocumento = ${formik.values.usuario}
                  AND contrasena = '${formik.values.contrasena}'
                  `;
    axios.get(host+query)
      .then( (res) => {
        if(res.ok){
          return JSON.parse(res.data);
        }else{
          console.log('Usuario o contraseña equivocados');
        }
      })
      .then((res) => {
        if(formik.values.tipoUsuario === 'paciente'){
          localStorage.setItem('usuario', formik.values.usuario);
          localStorage.setItem('tipoUsuario', formik.values.tipoUsuario);
          navigate('/afiliado');
        }
        if(formik.values.tipoUsuario === 'administrador'){
          query = `SELECT * FROM Administrador
                  WHERE k_numeroDocumento = ${formik.values.usuario}
                  AND k_tipoDocumento = '${res[0]}'`;
          axios.get(host+query)
            .then(r => {
              if(r.ok){
                localStorage.setItem('usuario', formik.values.usuario);
                localStorage.setItem('tipoUsuario', 'admin');
                navigate('/admin');
              }
            })
        }
        if(formik.values.tipoUsuario === 'medico'){
          query = `SELECT * FROM Medico
                  WHERE k_numeroDocumento = ${formik.values.usuario}
                  AND k_tipoDocumento = '${res[0]}'`;
          axios.get(host+query)
            .then(r => {
              if(r.ok){
                localStorage.setItem('usuario', formik.values.usuario);
                localStorage.setItem('tipoUsuario', 'medico');
                navigate('/medico');
              }
            })
        }
        
      });
  };

  const formik = useFormik({ initialValues, validate, onSubmit });

  return (
    <div className="principal">
      <div className="secundario">
        <div className="titulo">
          <h1>Boost Health</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            accusamus quod, a dolore exercitationem consectetur sequi
            perferendis commodi ex deleniti?
          </span>
        </div>
        <form className="formulario" onSubmit={formik.handleSubmit}>
          <div className="contenedor">
            <select
              name="tipoUsuario"
              id="tipoUsuario"
              value={formik.values.tipoUsuario}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="seleccionar">Seleccione tipo de usuario</option>
              <option value="paciente">Paciente</option>
              <option value="administrador">Administrador</option>
              <option value="medico">Médico</option>
            </select>
            <input
              type="number"
              name="usuario"
              id="usuario"
              value={formik.values.usuario}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Usuario"
            />
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              value={formik.values.contrasena}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Contraseña"
            />
            <button className="enviar" type="submit">
              Iniciar Sesion
            </button>
          </div>
          <Link className="link" to="/recuperarContrasena">
            Recuperar contraseña
          </Link>
        </form>
      </div>
    </div>
  );
};
