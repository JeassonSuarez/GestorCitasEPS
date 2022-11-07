import React, { useState } from "react";
import Confirmacion from "./confirmacion";

const CitaAfiliado = ({...props}) => {

    const [nameClassModal, setNameClassModal] = useState('hidden');
    const [nameClassModalModificar, setNameClassModalModificar] = useState('hidden');

    const abrirModal = (...params) => {
        setNameClassModal(params[0] || '');
    }
    const abrirModalModificar= (...params) => {
        setNameClassModalModificar(params[0] || '');
    }
    
    return(
        <div className="div-conainer-citas cita">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <button className='rojo' onClick = {abrirModal}>Cancelar</button>
            <button className='azul' onClick = {abrirModalModificar}>Modificar</button>
            <Confirmacion titulo='Confirmar cancelación de cita' descripcion='¿Esta seguro de que desea cancelar esta cita?' nameClassModal={nameClassModal} abrirModal={abrirModal} />
            <Confirmacion titulo='Confirmar modificación de cita' descripcion='¿Esta seguro de que desea modificar esta cita?' nameClassModal={nameClassModalModificar} abrirModal={abrirModalModificar} />
        </div>
    );
}

export default CitaAfiliado;