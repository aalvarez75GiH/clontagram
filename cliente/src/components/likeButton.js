import React from 'react' 
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'

const LikeButton = ({ onSubmitLike, estaLike }) => {
    

    return(
        <button onClick={ onSubmitLike }>
            {
                estaLike ? (
                    <FontAwesomeIcon 
                    className="text-red-dark" 
                    icon={heartSolid}/>
                ) : (
                    <FontAwesomeIcon 
                    // className="text-red-dark" 
                    icon={heartRegular}/>
                ) 
                 
            }

        </button>
    )
}

export default LikeButton

