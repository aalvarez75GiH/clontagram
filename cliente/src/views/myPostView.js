import React, { useEffect, useState } from 'react'
import Main from '../components/main'
// import { Link } from 'react-router-dom'
 import Loading from '../components/loading'
import Avatar from '../components/avatar'
import CommentForm from '../components/commentForm'
import LikeButton from '../components/likeButton'
import axios from 'axios'
import { addingComment } from '../helpers/post-helper'


const MyPostView = ({ showError, match }) => {
    
    const postID = match.params.id
    const [ postView, setPostView ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ postDoNotExist, setPostDoNotExist ] = useState(false)
    

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


    const onSubmitComment = async(comment) => {
        console.log(comment) 
        const updatedPost = await addingComment(postView, comment, postView.usuario)
        // updatePost(post, updatedPost)
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
                        componente1
                        <div className="Post__like">
                            <LikeButton estaLike={postView.estaLike}/>
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

export default MyPostView

{/* <div className="Post-Componente">
            <Avatar user={user}/>
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
            <CommentForm  
            showError={ showError }
            onSubmitComment = { onSubmitComment }
            />
        </div>     */}

        // <div className="Post">
        // +      <div className="Post__image-container">
        // +        <img src={url} alt={caption} />
        // +      </div>
        // +      <div className="Post__side-bar">
        // +        <Avatar usuario={usuario} />
        // +
        // +        <div className="Post__comentarios-y-like">
        // +          <Comentarios
        // +            usuario={usuario}
        // +            caption={caption}
        // +            comentarios={comentarios}
        // +          />
        // +          <div className="Post__like">
        // +            <BotonLike onSubmitLike={onSubmitLike} like={estaLike} />
        // +          </div>
        // +          <Comentar onSubmitComentario={onSubmitComentario} />
        // +        </div>
        // +      </div>
        // </div>