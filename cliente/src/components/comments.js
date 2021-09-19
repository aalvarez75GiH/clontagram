import React from 'react'

import { Link } from 'react-router-dom'


const Comments = ({ comments }) => {
    
    return comments.map((comment)=> {
            return(
                <li key={comment._id}>
                    <Link to={`/profile/${comment.usuario.username}`}>
                        {<b>{comment.usuario.username}</b>}
                    </Link>{' '}
                    { comment.mensaje }
                </li>
            )
    })
    
}

export default Comments