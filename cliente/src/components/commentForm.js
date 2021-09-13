import React, { useState } from 'react'

const CommentForm = ({ showError }) => {
    
    const [comment, setComment] = useState('')
    
    const handleInputChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
        console.log(e.target.value)
    }
    
    const onSubmitComment = (e) => {
        e.preventDefault()
        console.log('Yo have submitted your comment...')
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
                    <button type="submit">Post</button>  
            </form>
        </div>
    )
}

export default CommentForm