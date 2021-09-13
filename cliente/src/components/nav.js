import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Nav = ({ user }) => {
    
    return (
    <nav className="Nav">
        <ul className="Nav__links">
            <li>
                <Link to="/" className="Nav__link">
                    Clontagram
                </Link>
            </li>
            { user && <LoginRoutes /> }
        </ul>
    </nav>
    
)
}

const LoginRoutes = () => {
    return (
        <React.Fragment>
            <li className="Nav__link-push">
                <Link to="/upload" className="Nav__link">
                    <FontAwesomeIcon className="Nav__icon" icon={faCameraRetro}/>
                </Link>
            </li>
        </React.Fragment>
    )
}
export default Nav