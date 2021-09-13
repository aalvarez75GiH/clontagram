import React, {useState} from 'react'
import Main from '../components/main'
import { Link } from 'react-router-dom'




const Login = ({ login, showError }) => {

    const [ credentials, setCredentials ] = useState({
        email: '',
        password:''
    })


    const handleInputChange = (e) => {
        e.preventDefault()
        setCredentials(
            {
                ...credentials, [e.target.name]: e.target.value
            }
        )
    }
    
    const handleOnSubmit = async(e) => {
        e.preventDefault()
        
        try {
            await login(credentials.email, credentials.password)
        } catch(error){
            showError(error.response.data)
            // console.log(error)
        }
          
    }

    return (
            <Main center={ true }>
               <div className="Signup">
                   <div className="FormContainer">
                       <h1 className="Form__titulo">Clontagram</h1>
                       <div>
                        <form
                        onSubmit={(e)=> handleOnSubmit(e)}
                        >
                            <input
                            onChange={ (e) => handleInputChange(e)} 
                            className="Form__field" 
                            type="email" 
                            name="email" 
                            placeholder="email"
                            required
                            value={credentials.email}

                            />
                            <input
                            onChange={ (e) => handleInputChange(e)} 
                            className="Form__field" 
                            type="password"
                            autoComplete="on" 
                            name="password" 
                            placeholder="password"
                            required
                            value={credentials.password}
                            />
                            <button 
                            className="Form__submit" 
                            type="submit">Login</button>
                            <p 
                            className="FormContainer__info">
                             Do you wanna have an account with us?
                             <Link to="/signup">Register</Link>
                             </p>
                        </form>
                       </div>
                       
    
                   </div>
    
               </div>
            </Main>
    )
}

export default Login