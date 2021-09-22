import React from 'react'

const LogOutButton = ({ logOut }) => {
    return(
        <button
        onClick={logOut} 
        className="Perfil__boton-logout">Logout</button>
    )
}

export default LogOutButton