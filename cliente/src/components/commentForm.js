import React, { useState } from 'react'

const CommentForm = ({ showError, onSubmitComment }) => {
    
    const [comment, setComment] = useState('')
    
    
    const handleInputChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
        console.log(e.target.value)
    }

    const handlingComment = (e) => {
        e.preventDefault()
        onSubmitComment(comment)
    } 
    
    
    return (
        <div>
            <form className="Post__comentario-form-container"
            onSubmit={(e)=> onSubmitComment(e)}
            >
                <input
                    onChange={ (e) => handleInputChange(e)} 
                    type="text" 
                    placeholder="leave your comment"
                    required
                    value={comment}
                    maxLength="180"
                    />
                    <button
                    onClick={(e) => handlingComment(e) } 
                    type="submit">Post</button>  
            </form>
        </div>
    )
}

export default CommentForm