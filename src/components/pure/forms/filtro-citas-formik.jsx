import React from 'react'
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from "yup";
import '../../../styles/filtro-asignacionCitas.css'

export const FiltroCitas = () => {

  const initialValues = {
    especialidad: '',
    hora: '',
    sede: '',
    medico: ''
  }

  const filtroCitasEsquema = Yup.object().shape(
    {
      tipoCita: Yup.string()
        .oneOf(
          ["designer", "development", "product", "other"],
          "Invalid Job Type")
        .required("Debe seleccionar un tipo de cita"),
      especialidad: Yup.string()
        .oneOf(
          ["designer", "development", "product", "other"],
          "Invalid Job Type")
        .required("Debe seleccionar una especialidad"),
      hora: Yup.string()
        .oneOf(
          ["designer", "development", "product", "other"],
          "Invalid Job Type"
        ),
      sede: Yup.string()
        .oneOf(
          ["designer", "development", "product", "other"],
          "Invalid Job Type")
        .required("Debe seleccionar una sede"),
      medico: Yup.string()
        .oneOf(
          ["designer", "development", "product", "other"],
          "Invalid Job Type"
        )
    }
  );

  return (
    <>
      <Formik
        initialValues={ initialValues }
        validationSchema={ filtroCitasEsquema }
        onSubmit={async (values, { setSubmitting }) => {
            console.log(values)
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
      {({ values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur }) => (
        <Form className='form-filtro-asignacionCitas'>

          <label htmlFor="tipoCita">Tipo de cita:</label>
          <Field component="select" id="tipoCita" name="tipoCita" className='select'>
            <option value="">Seleccione una tipo de cita</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </Field>
          {/* levelTask errors */}
          {
              errors.tipoCita && touched.tipoCita &&
              (
                  <ErrorMessage component='div' name='tipoCita' className='errorM' />
              )
          }
          
          <label htmlFor="especialidad">Especialidad:</label>
          <Field component="select" id="especialidad" name="especialidad" className='select'>
            <option value="">Seleccione una especialidad</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </Field>
          {/* levelTask errors */}
          {
              errors.especialidad && touched.especialidad &&
              (
                  <ErrorMessage component='div' name='especialidad' className='errorM' />
              )
          }
          <label htmlFor="hora">Hora:</label>
          <Field component="select" id="hora" name="hora" className='select'>
            <option value="">Seleccione una hora</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </Field>
          {/* levelTask errors */}
          {
              errors.hora && touched.hora &&
              (
                  <ErrorMessage component='div' name='hora' className='errorM' />
              )
          }
          <label htmlFor="sede">Sede:</label>
          <Field component="select" id="sede" name="sede" className='select'>
            <option value="">Seleccione una sede</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </Field>
          {/* levelTask errors */}
          {
              errors.sede && touched.sede &&
              (
                  <ErrorMessage component='div' name='sede' className='errorM' />
              )
          }
          <label htmlFor="medico">Médico:</label>
          <Field component="select" id="medico" name="medico" className='select'>
            <option value="">Seleccione un medico</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </Field>
          {/* levelTask errors */}
          {
              errors.medico && touched.medico &&
              (
                  <ErrorMessage component='div' name='medico' className='errorM' />
              )
          }
          <button type='submit' className='azul'>Buscar citas</button>
        </Form>
        )}
      </Formik>
    </>
  );
};