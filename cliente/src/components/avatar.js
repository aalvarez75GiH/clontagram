import React from 'react'
import { Link } from 'react-router-dom'
import stringToColor from 'string-to-color'

const Avatar = ({ user }) => {
    return(
        <div className="Avatar">
            <AvatarImage user={ user }/>
            <Link to={`/perfil/${user.username}`}><h2>{user.username}</h2></Link>
        </div>
    )
}

export const AvatarImage = ({ user }) => {
   const style = {
       backgroundImage: user.imagen ? `url(${user.imagen})` : null,
       backgroundColor: stringToColor(user.username)
   }
   return <div className="Avatar__img" style={ style }></div>
}

export default Avatar

