import React from 'react' 
import { Link } from 'react-router-dom'
const PostItem = ({ _id, url, caption})=> {
    return (
        <Link to={`/post/${_id}`} className="Grid__post">
            <img src={url} alt={caption} className="Grid__post-img"></img>
        </Link>
    )
}

export default PostItem