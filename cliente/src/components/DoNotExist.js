import React from 'react'
import Main from './main'
import { Link } from 'react-router-dom'

const DoNotExist = ({ message }) => {
    return (
        <Main center>
            <div>
                <h2 className="RecuersoNoExiste__mensaje">{message}</h2>
                <p className="RecuersoNoExiste-link-container">
                    Go to <Link to="/">Feed</Link>
                </p>
            </div>
        </Main>
    )
}

export default DoNotExist