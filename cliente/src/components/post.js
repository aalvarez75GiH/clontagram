import React, { useState } from 'react'
import Avatar from './avatar'
import LikeButton from './likeButton'
import { Link } from 'react-router-dom'
import CommentForm from './commentForm'


const Post = ({ post, updatePost, showError }) => {
    
    const {
        numLikes,
        numComentarios,
        comentarios,
        _id,
        caption,
        url,
        usuario,
        estaLike,
    } = post
 
    const onSubmitLike = (e) => {
        e.preventDefault()
        console.log('They Like me...')

    }


    return (
        <div className="Post-Componente">
            <Avatar user={usuario}/>
            <img src={url} alt={caption} />
            <div className="Post-Componente__acciones">
                <div className="Post-Componente__like-container">
                    <LikeButton estaLike={estaLike} onSubmitLike={(e)=> onSubmitLike(e)}/>
                </div>
                <p>Liked for { numLikes } people</p>
                <ul>
                    <li>
                        <Link to={`/profile/${usuario.username}`}>
                            <b>{usuario.username}</b> 
                        </Link> {' '}
                        { caption }                        
                    </li>
                    <AllComments _id={_id} numComentarios={ numComentarios } />
                    <SomeComments comentarios={ comentarios }/>
                </ul>
            </div>
            <CommentForm showError={showError}/>
        </div>    
    )
}

const AllComments = ({ _id, numComentarios }) => {
    if(numComentarios === 0){
        return null
    }
    return (
        <li className="text-grey-dark">
            <Link to={`/post/${_id}`}>
                See { numComentarios } comments  
            </Link>
        </li>
    )

}

const SomeComments = ({ comentarios }) => {
    if (comentarios.length === 0){
        return null
    }

    return comentarios.map((comentario)=> {
        return(
            <li>
                <Link to={`/profile/${comentario.usuario.username}`}>
                    {<b>{comentario.usuario.username}</b>}
                </Link>{' '}
                { comentario.mensaje }
            </li>
        )
    })



}








export default Post

