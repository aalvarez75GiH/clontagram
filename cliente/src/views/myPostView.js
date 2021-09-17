import React, { useEffect, useState } from 'react'
import Main from '../components/main'
import { Link } from 'react-router-dom'
 import Loading from '../components/loading'
import Avatar from '../components/avatar'
import CommentForm from '../components/commentForm'
import LikeButton from '../components/likeButton'
import axios from 'axios'
import { addingComment, toggleLike } from '../helpers/post-helper'
import Comments from '../components/comments'


const MyPostView = ({ showError, match, user }) => {
    
    const postID = match.params.id
    const [ postView, setPostView ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ postDoNotExist, setPostDoNotExist ] = useState(false)
    const [ sendingLike, setSendingLike ] = useState(false)
    

    useEffect(()=>{
        
        const gettingData = async() => {           
            setTimeout(async()=> {
                try {
                
                    setLoading(true)
                    const { data: post }  = await axios.get(`/api/posts/${postID}`)
                    console.log(post)
                    setPostView(post)
                    setLoading(false)
            } catch (error) {
                // if (error.response.status){
                //     console.log(error.response.status)
                // }
                if (error.response && 
                    (error.response.status === 404 || error.response.status === 400)){
                    setPostDoNotExist(true)
                }else{
                    showError('We are having issues to load the Post data...')
                }
                setLoading(false)
            }
            },2000)
        }
        gettingData() 
    },[postID, showError])

    const renderingPost = async() => {
        const { data: post }  = await axios.get(`/api/posts/${postID}`)
        setPostView(post)
    }

    const onSubmitComment = async(comment) => {
        console.log(comment) 
        await addingComment(postView, comment, user)
        renderingPost()
    }

      
    const onSubmitLike = async(e) => {
        e.preventDefault()
        
        if (sendingLike){
            return
        }

        try {
            setSendingLike(true)
            const updatedPost = await toggleLike(postView)
            renderingPost()
            setSendingLike(false)
        } catch (error) {
            console.log(error)
        }
    }
 
    if (loading) {
        return(
            <Main center>
                <Loading />
            </Main>
        )
    }

    if (postDoNotExist){
        return (
            <Main center>
                <h1>Error 404</h1>
            </Main>
        )
    }

    return (
        <Main center>
            <div className="Post">
                <div className="Post__image-container" >
                    <img src={postView.url} alt={postView.caption} />

                </div>
                <div className="Post__side-bar" >
                    <Avatar user={postView.usuario}/>
                    <div className="Post__comentarios-y-like">
                        <div className="Post-Componente__acciones">
                            <ul>
                                <li>
                                    <Link to={`/profile/${postView.usuario.username}`}>
                                        <b>{postView.usuario.username}</b> 
                                    </Link> {' '}
                                    { postView.caption }                        
                                </li>
                                <Comments id={ postID } showError={showError}/>
                                {/* <SomeComments comentarios={ postView.comentarios }/> */}
                            </ul>
                        </div>
                        <div className="Post__like">
                            <LikeButton estaLike={postView.estaLike} onSubmitLike={onSubmitLike}/>
                        </div>
                        <CommentForm
                        onSubmitComment={ onSubmitComment }
                        showError={showError}
                        />
                    </div>
                </div>
            </div>
            
        </Main>
        
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

export default MyPostView

