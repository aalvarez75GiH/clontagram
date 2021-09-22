import React from 'react'

const DescriptionProfile = ({ profileOwner }) => {
    return (
    <div className="Perfil__descripcion">
        <h2 className="Perfil__nombre">{profileOwner.nombre}</h2>
        <p>{profileOwner.bio}</p>
        <p className="Perfil__estadisticas">
            <b>{profileOwner.numSiguiendo}</b>      fallowing
                <span className="ml-4">
                    <b>{profileOwner.numSeguidores}</b>     fallowers
                </span>
        </p>
    </div>
)}

export default DescriptionProfile