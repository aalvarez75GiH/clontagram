import React from 'react'

const LoadMore = ({ onClick, isLoad }) => {
    
    if (isLoad){
        return(
            <div className="Feed__no-hay-mas-posts">    
                There are no more posts...
            </div>
        )
    }
    
    return (
        <button
        onClick={onClick} 
        className="Feed__cargar-mas">
            See more
        </button>

    )
}

export default LoadMore