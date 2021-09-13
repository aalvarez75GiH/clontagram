import React from 'react'
import { Link } from 'react-router-dom'

const NoPosts = () => {
    return (

        <div className="NoSiguesANadie">
            <p className="NoSiguesANadie__mensaje">
                Your feed don't have pictures,
                 because weather you dont follow anybody or 
                 you haven't posted any...
            </p>
            <div>
                <Link to="/explore" className="NoSiguesANadie__boton">
                    Explore...
                </Link>
            </div>

        </div>
    )
}

export default NoPosts
