import React from 'react' 
import { Link } from 'react-router-dom'

const MyPostItem = ({ _id, url, caption})=> {
    return (
        <div className="postContainer">
            <Link to={`/post/${_id}`}>
                <img src={url} alt={caption}></img>
            </Link>
        </div>
        
    )
}

export default MyPostItem

