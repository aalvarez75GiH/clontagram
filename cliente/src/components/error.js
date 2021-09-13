import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'


const Error = ({ message, hideError }) => {
    if (!message) {
        return null
    }
    
    return (
        <div className="ErrorContainer" role="alert">
            <div className="Error__inner">
                <span className="block">{ message }</span>
                <button
                onClick={()=> hideError()} 
                className="Error__button">
                    <FontAwesomeIcon className="Error__icon" icon={faTimesCircle}/>
                </button>
            </div>
        </div>
        
    )
}

export default Error