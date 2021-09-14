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
