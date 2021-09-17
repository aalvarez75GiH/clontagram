import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Comments = ({ id, showError }) => {
    const loadingComments = async() => {
        const { data: allComments } = await axios.get(`/api/posts/${id}/comentarios`)
        //const { data: allComments } = await axios.get(`/api/posts/all/comments`)
        return allComments
    }

    const [ comments, setComments ] = useState([])
    const [ loadingInitialComments, setLoadingInitialComments] = useState(true)

    useEffect(()=> {
        const initialLoad = async()=> {
            try {
                const newComments = await loadingComments()
                setComments(newComments)
                setLoadingInitialComments(false)
            } catch (error) {
                showError('We are having issues to load the Cooments...')
                console.log(error)
            }
        }
        
        initialLoad()
            
    },[])
    
    return comments.map((comentario)=> {
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

export default Comments