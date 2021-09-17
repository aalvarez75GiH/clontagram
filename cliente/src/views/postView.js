import React, { useEffect, useState } from 'react'
import Main from '../components/main'
import { Link } from 'react-router-dom'
import Loading from '../components/loading'
import Avatar from '../components/avatar'
import CommentForm from '../components/commentForm'
import LikeButton from '../components/likeButton'
import axios from 'axios'
import DoNotExist from '../components/DoNotExist'
import HisComments from '../components/hisComments'

const PostView = ({ showError, match }) => {
    
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

 
    if (loading) {
        return(
            <Main center>
                <Loading />
            </Main>
        )
    }

    if (postDoNotExist){
        return <DoNotExist message="The post do not exist... "/>
    }

    if (postView === null){
        return null
    }
  
    return (
        <Main center>
            <Post {...postView}/>
        </Main>
        
    )
}

const Post = ({ 
    comentarios, 
    caption, 
    url, 
    usuario,
    estaLike,
    onSubmitLike,
    onSubmitComment, 
    showError
}) => {
    // const postID = match.params.id
    return (
        <div className="Post">
                <div className="Post__image-container" >
                    <img src={url} alt={caption} />

                </div>
                <div className="Post__side-bar" >
                    <Avatar user={usuario}/>
                    <div className="Post__comentarios-y-like">
                        <HisComments
                        user={usuario}
                        caption={ caption }
                        comments={comentarios}
                        />
                        <div className="Post__like">
                            <LikeButton estaLike={estaLike} onSubmitLike={onSubmitLike}/>
                        </div>
                        <CommentForm
                        onSubmitComment={ onSubmitComment }
                        showError={showError}
                        />
                    </div>
                </div>
            </div>
    )
}





export default PostView