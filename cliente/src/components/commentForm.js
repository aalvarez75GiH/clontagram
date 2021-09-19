import React, { useState } from 'react'

const CommentForm = ({ showError, onSubmitComment }) => {
    
    const [comment, setComment] = useState('')
    const [sendingComment, setSendingComment] = useState(false)
    
    const handleInputChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }

    const handlingComment = async(e) => {
        e.preventDefault()
        if (sendingComment){
            return
        }
        try {
            setSendingComment(true)
            await onSubmitComment(comment)
            setComment(' ')
            setSendingComment(false)
        } catch (error) {
            setSendingComment(false) 
            showError('we had a problem posting your comment, try again later... ')
        }
    } 
    
    
    return (
        <div>
            <form className="Post__comentario-form-container"
            onSubmit={(e)=> handlingComment(e)}
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