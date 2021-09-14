import React, { useState } from 'react'
import Avatar from './avatar'
import LikeButton from './likeButton'
import { Link } from 'react-router-dom'
import CommentForm from './commentForm'
import { toggleLike, addingComment } from '../helpers/post-helper'

const Post = ({ post, updatePost, showError, usuario }) => {
    
    const {
        numLikes,
        numComentarios,
        comentarios,
        _id,
        caption,
        url,
        usuario: usuarioDelPost,
        estaLike,
    } = post

    const [sendingLike,setSendingLike] = useState(false)
    
 
   
    const onSubmitLike = async(e) => {
        e.preventDefault()
        
        if (sendingLike){
            return
        }

        try {
            setSendingLike(true)
            const updatedPost = await toggleLike(post)
            updatePost(post,updatedPost)
            setSendingLike(false)
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmitComment = async(comment) => {
        console.log(comment) 
        const updatedPost = await addingComment(post, comment, usuario)
        updatePost(post, updatedPost)
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
                        <Link to={`/profile/${usuarioDelPost.username}`}>
                            <b>{usuarioDelPost.username}</b> 
                        </Link> {' '}
                        { caption }                        
                    </li>
                    <AllComments _id={_id} numComentarios={ numComentarios } />
                    <SomeComments comentarios={ comentarios }/>
                </ul>
            </div>
            <CommentForm  
            showError={ showError }
            onSubmitComment = { onSubmitComment }
            />
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
            <li key={comentario._id}>
                <Link to={`/profile/${comentario.usuario.username}`}>
                    {<b>{comentario.usuario.username}</b>}
                </Link>{' '}
                { comentario.mensaje }
            </li>
        )
    })



}








export default Post

