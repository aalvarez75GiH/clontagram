import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HisComments = ({ user, caption, comments  }) => {
    return (
        <ul className="Post__comentarios">
            <li className="Post_comentario">
                <Link 
                    to={`/perfil/${user.username}`} 
                    className="Post__autor-comentario">
                        <b>{user.username}</b>
                </Link>{ ' '}
                { caption }
            </li>
            {
                comments.map((comment)=> {
                    return(
                        <li key={comment._id} className="Post__comentario">
                            <Link 
                                to={`/perfil/${comment.usuario.username}`} 
                                className="Post__autor-comentario">
                                <b>{comment.usuario.username}</b>
                            </Link>{' '}
                        {comment.mensaje}
                    </li>
                    )
                    
                })
            }

        </ul>
    )
    
}

export default HisComments