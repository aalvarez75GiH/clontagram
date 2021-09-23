import axios from 'axios'

export const toggleLike = async(post) => {
    const url = `/api/posts/${post._id}/likes`
    
    let postChanged
    
    // console.log(url)
    // console.log(post)
    if (post.estaLike) {
        await axios.delete(url, {})
        postChanged = {
            ...post,
            estaLike: false,
            numLikes: post.numLikes - 1 
        }
        
    } else {
        await axios.post(url, {})
        postChanged = {
            ...post,
            estaLike: true,
            numLikes: post.numLikes + 1 
        }
    }
    
    return postChanged
}

export const addingComment = async(post, comment, user) => {
    const url_comment = `/api/posts/${post._id}/comentarios`
    const { data: nuevoComentario } = await axios.post(url_comment, {
        mensaje: comment
    })
    // console.log(nuevoComentario)
    nuevoComentario.usuario = user
    
    const postChanged = {
        ...post,
        comentarios: [...post.comentarios, nuevoComentario],
        numComentarios: post.numComentarios + 1
    }
    return postChanged
}



