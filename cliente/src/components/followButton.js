import React from 'react'

const FollowButton = ({ following, handlingFriendship}) => {
    return (
        <button
        onClick={ handlingFriendship }
        className="Perfil__boton-seguir"
        >
            { following ? 'Unfollow' : 'Follow' }

        </button>
    )
}

export default FollowButton