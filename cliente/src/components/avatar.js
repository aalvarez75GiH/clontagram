import React from 'react'
import { Link } from 'react-router-dom'
import ImageAvatar from './imageAvatar'

const Avatar = ({ user }) => {
    return(
        <div className="Avatar">
            <ImageAvatar user={ user }/>
            {/* <AvatarImage user={ user }/> */}
            <Link to={`/perfil/${user.username}`}><h2>{user.username}</h2></Link>
        </div>
    )
}


export default Avatar

