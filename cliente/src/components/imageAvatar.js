import React from 'react'
import stringToColor from 'string-to-color'



const ImageAvatar = ({ user }) => {
    const style = {
        backgroundImage: user.imagen ? `url(${user.imagen})` : null,
        backgroundColor: stringToColor(user.username)
    }
    return <div className="Avatar__img" style={ style }></div>
}

export default ImageAvatar