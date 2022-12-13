import { useFormik } from "formik";
import { useState, useEffect } from "react";
import "../login/login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const Registrar = () => {
  const [mostrarForm, setMostrar] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [sede, setCurrentSede] = useState(1);
  const [sedes, setSedes] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  //let host = 'http://localhost:/eps-server?';
  let host = "https://eps-factores.000webhostapp.com?";
  const buscar = "accion=buscar&query=";
  const insertar = "accion=insertar&query=";
  let query = "SELECT * FROM EMPRESA";
  useEffect(() => {
    axios
      .get(host + buscar + query)
      .then((res) => JSON.parse(res.data))
      .then((res) => {
        let arr = [];
        for (let data of res) {
          arr.push(JSON.parse(data));
        }
        setEmpresas(arr);
      });
    query = "SELECT k_sede, n_nombreSede FROM Sede";
    axios
      .get(host + buscar + query)
      .then((res) => JSON.parse(res.data))
      .then((res) => {
        let arr = [];
        for (let data of res) {
          arr.push(JSON.parse(data));
        }
        setSedes(arr);
      });
  }, []);

  useEffect(() => {
    query = `SELECT k_numeroConsultorio FROM Consultorio WHERE k_sede = ${sede}`;
    axios
      .get(host + buscar + query)
      .then((res) => JSON.parse(res.data))
      .then((res) => {
        let arr = [];
        for (let data of res) {
          arr.push(JSON.parse(data));
        }
        setConsultorios(arr);
      });
  }, [sede]);

  const initialValues = {
    tipoUsuario: "seleccionar",
    nombre: "",
    identificacion: "",
    tipoAfiliacion: "beneficiario",
    tipoID: "Cedula de ciudadania",
    empresa: "seleccionar",
    otraEmpresa: "",
    especialidad: "seleccionar",
    fijo: "",
    celular: "",
    fecha: new Date(),
    correo: "",
    fechaNacimiento: "",
    sexo: "masculino",
    codigo: "",
    contrasena: "",
    afiliacion: "Beneficiario",
    estado: "Activo",
    categoria: "A",
    identificacionCotizante: "",
    tipoIDCotizante: "Cedula de ciudadania",
    consultorio: "Seleccionar",
    sede: 1,
  };

  const usuarioValido = (e) => {
    setMostrar(e.target.value !== "seleccionar");
    formik.setFieldValue("tipoUsuario", e.target.value);
  };

  const validate = (values) => {
    let errors = {};

    if (formik.values.tipoUsuario === "paciente") {
      //Se necesitan nombre, tipoAfiliacion, empresa que lo afilió, identificacion, tipoIdentificacion,
      //Contraseña, teléfono fijo, teléfono celular, correo, Fecha de nacimiento y sexo

      if (!values.nombre) {
        errors.nombre = "Se debe ingresar un nombre";
      }

      if (
        values.empresa === "seleccionar" ||
        (values.empresa === "otra" && !values.otraEmpresa)
      ) {
        errors.empresa = "Se debe seleccionar una empresa válida";
      }

      if (!values.identificacion || values.identificacion > 2147483647) {
        errors.identificacion = "Ingrese un número de identificacion válido";
      }

      if (values.contrasena?.length < 6 || !values.contrasena?.length > 16) {
        errors.contrasena = "La contraseña debe tener entre 6 y 16 caracteres";
      }

      if (values.celular?.toString().length !== 10) {
        errors.celular = "El número celular debe tener 10 cifras";
      }

      if (!values.correo) {
        errors.correo = "Debe ingresar un correo";
      }

      if (values.afiliacion === "Beneficiario") {
        if (!values.identificacionCotizante) {
          errors.identificacionCotizante =
            "Se debe ingresar una identificacion";
        }
      }
    }

    return errors;
  };

  let verificarEmpresa = async () => {
    let id = 0;
    if (formik.values.empresa === "otra") {
      id = Math.round(Math.random() * 10000);
      query = `SELECT * FROM EMPRESA WHERE n_nombreEmpresa = '${formik.values.otraEmpresa}'`;
      try {
        axios.get(host + buscar + query).then((res) => {
          if (!res.ok) {
            console.log("No está repetida la empresa");
            query = `INSERT INTO EMPRESA VALUES (${id}, '${formik.values.otraEmpresa}')`;
            axios.get(host + insertar + query).then((res) => {
              console.log("Se agregó una nueva empresa");
            });
          }
        });
      } catch (e) {
        console.log("No se pudo agregar la empresa");
      }
    } else {
      id = formik.values.empresa;
    }
    return id;
  };

  const enviarUsuario = async () => {
    let fecha = formik.values.fecha;
    fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;

    let datos = {
      nombre: formik.values.nombre,
      contrasena: formik.values.contrasena,
      fijo: parseInt(formik.values.fijo),
      celular: parseInt(formik.values.celular),
      correo: formik.values.correo,
      nacimiento: fecha,
      tipoID: formik.values.tipoID,
      identificacion: parseInt(formik.values.identificacion),
      sexo: formik.values.sexo.charAt(0),
      afiliacion: formik.values.afiliacion,
    };

    datos.tipoAfiliacion = formik.values.tipoAfiliacion;
    datos.empresa = await verificarEmpresa();

    query = `INSERT INTO Usuario VALUES 
      (
      '${datos.tipoID}',
      ${datos.identificacion},
      '${datos.nombre}',
      '${datos.sexo}',
      '${fecha}',
      ${datos.fijo},
      ${datos.celular},
      '${datos.correo}',
      '${datos.contrasena}',
      1,
      ${formik.values.tipoUsuario !== "Paciente" ? 3 : datos.empresa}
      );`;

    console.log(host + insertar + query);
    axios.get(host + insertar + query).then((res) => {
      console.log(res.data);
    });
    return datos;
  };

  const enviarAfiliado = async (datos) => {
    if (formik.values.categoria === "A") {
      datos.categoria = 1;
    }
    if (formik.values.categoria === "B") {
      datos.categoria = 2;
    }
    if (formik.values.categoria === "C") {
      datos.categoria = 3;
    }

    if (formik.values.afiliacion === "Afiliado") {
      query = `INSERT INTO Afiliado_Beneficiario VALUES
              (
                '${datos.tipoID}',
                ${datos.identificacion},
                '${datos.afiliacion}',
                'Activo',
                ${datos.categoria},
                ${null},
                ${null}
              )`;
    } else {
      datos.tipoIDCotizante = formik.values.tipoIDCotizante;
      datos.identificacionCotizante = formik.values.identificacionCotizante;
      query = `INSERT INTO Afiliado_Beneficiario VALUES
              (
                '${datos.tipoID}',
                ${datos.identificacion},
                '${datos.afiliacion}',
                'Activo',
                ${datos.categoria},
                '${datos.tipoIDCotizante}',
                ${datos.identificacionCotizante}
              )`;
    }
    console.log(host + insertar + query);
    axios.get(host + insertar + query).then((res) => {
      console.log(res.data);
    });
  };

  const enviarMedico = async (datos) => {
    query = `INSERT INTO Medico
            VALUES(
              '${datos.tipoID}',
              ${datos.identificacion},
              '${formik.values.codigo}'
            )`;
    try {
      console.log(host + insertar + query);
      axios.get(host + insertar + query).then((res) => {
        console.log(res.data);
        query = `INSERT INTO Especialidad_Medico_Consultorio VALUES(
          ${formik.values.especialidad},
          '${datos.tipoID}',
          ${datos.identificacion},
          ${formik.values.consultorio},
          ${formik.values.sede},
          'Mañana'
        )`;
        axios.get(host+insertar+query).then((res) => {
          console.log(res.data);
        })
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {
    switch (formik.values.tipoUsuario) {
      case "paciente":
        enviarUsuario().then((datos) => {
          setTimeout(() => {
            enviarAfiliado(datos);
          }, 1000);
        });
        break;
      case "medico":
        enviarUsuario().then((datos) => {
          setTimeout(() => {
            enviarMedico(datos);
          }, 1000);
        });
        break;
      default:
        break;
    }
  };

  const formik = useFormik({ initialValues, onSubmit, validate });

  return (
    <div className="registrar">
      <h1>Registrar Usuario</h1>
      <form className="formulario" onSubmit={formik.handleSubmit}>
        <div className="contenedor">
          <select
            name="tipoUsuario"
            id="tipoUsuario"
            value={formik.values.tipoUsuario}
            onChange={usuarioValido}
            onBlur={formik.handleBlur}
          >
            <option value="seleccionar">Seleccione tipo de usuario</option>
            <option value="paciente">Paciente</option>
            <option value="administrador">Administrador</option>
            <option value="medico">Médico</option>
          </select>
          {mostrarForm && (
            <>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.values.tipoUsuario === "medico" && (
                <>
                  <select
                    name="especialidad"
                    id="especialidad"
                    value={formik.values.especialidad}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value={0}>Seleccionar Especialidad</option>
                    <option value={1}>Medicina general</option>
                    <option value={2}>Pediatría</option>
                    <option value={3}>Odontología</option>
                  </select>
                  <input
                    type="text"
                    name="codigo"
                    id="codigo"
                    placeholder="Código médico"
                    value={formik.values.codigo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="divisor">
                    <select
                      name="sede"
                      id="sede"
                      value={formik.values.sede}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {sedes?.map((dato) => <option value={dato[0]}>{dato[1]}</option>)}
                    </select>
                    <select
                      name="consultorio"
                      id="consultorio"
                      value={formik.values.consultorio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="Seleccionar">Seleccionar consultorio</option>
                        {consultorios?.map((consultorio) => <option value={consultorio[0]}>{consultorio[0]}</option>)}
                    </select>
                  </div>
                </>
              )}
              {formik.values.tipoUsuario === "paciente" && (
                <>
                  <div className="divisor">
                    <select
                      name="empresa"
                      id="empresa"
                      value={formik.values.empresa}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="seleccionar">Seleccionar empresa</option>
                      {empresas &&
                        empresas.map((empresa) => (
                          <option key={empresa[0]} value={empresa[0]}>
                            {empresa[1]}
                          </option>
                        ))}
                      <option value="otra">Otra</option>
                    </select>
                    {formik.values.empresa === "otra" && (
                      <input
                        type="text"
                        name="otraEmpresa"
                        id="otraEmpresa"
                        placeholder="¿Otra?"
                        value={formik.values.otraEmpresa}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    )}
                  </div>
                </>
              )}
              <div className="divisor">
                <select
                  name="tipoID"
                  id="tipoID"
                  value={formik.values.tipoID}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="Cedula de ciudadania">Cédula</option>
                  <option value="Tarjeta de identidad">
                    Tarjeta de identidad
                  </option>
                  <option value="Cedula  de extrangeria">
                    Cédula de extranjería
                  </option>
                  <option value="Registro civil">Registro civil</option>
                </select>
                <input
                  type="number"
                  name="identificacion"
                  id="identificacion"
                  placeholder="Identificacion"
                  value={formik.values.identificacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <input
                type="password"
                name="contrasena"
                id="contrasena"
                placeholder="Contraseña"
                value={formik.values.contrasena}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type="number"
                name="fijo"
                id="fijo"
                placeholder="Teléfono fijo"
                value={formik.values.fijo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type="number"
                name="celular"
                id="celular"
                placeholder="Teléfono celular"
                value={formik.values.celular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type="email"
                name="correo"
                id="correo"
                placeholder="Correo"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <>
                <DatePicker
                  selected={formik.values.fecha}
                  dateFormat="dd/MM/yyyy"
                  className="select-fecha"
                  id="fecha"
                  name="fecha"
                  showMonthDropdown
                  showYearDropdown
                  onChange={(date) => formik.setFieldValue("fecha", date)}
                />
              </>
              <select
                name="sexo"
                id="sexo"
                value={formik.values.sexo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
                <option value="m">Otro</option>
              </select>
              {formik.values.tipoUsuario === "paciente" && (
                <>
                  <div className="divisor">
                    <select
                      name="afiliacion"
                      id="afiliacion"
                      value={formik.values.afiliacion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="Beneficiario">Beneficiario</option>
                      <option value="Afiliado">Afiliado</option>
                    </select>

                    <select
                      name="categoria"
                      id="categoria"
                      value={formik.values.categoria}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>

                  <span className="separador-texto">Datos del cotizante</span>

                  <div className="divisor">
                    <select
                      name="tipoIDCotizante"
                      id="tipoIDCotizante"
                      value={formik.values.tipoIDCotizante}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="Cedula de ciudadania">Cédula</option>
                      <option value="Tarjeta de identidad">
                        Tarjeta de identidad
                      </option>
                      <option value="Cedula  de extrangeria">
                        Cédula de extranjería
                      </option>
                      <option value="Registro civil">Registro civil</option>
                    </select>
                    <input
                      type="number"
                      name="identificacionCotizante"
                      id="identificacionCotizante"
                      placeholder="Identificacion del cotizante"
                      value={formik.values.identificacionCotizante}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </>
              )}

              <button className="enviar" type="submit">
                Registrar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
