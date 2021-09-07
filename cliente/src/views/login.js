import React, {useState} from 'react'
import Main from '../components/main'
import axios from 'axios'
import { setToken } from '../helpers/auth-helpers'



const Login = ({ login }) => {

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
            login(credentials.email, credentials.password)
        } catch(error){
            console.log(error)
        }
          
    }

    return (
            <Main center={ true }>
               <div className="Signup">
                   {/* <img src={imagenSignUp} alt="" className="Signup__img" /> */}
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
                             <a href="/login">Register</a>
                             </p>
                        </form>
                       </div>
                       
    
                   </div>
    
               </div>
            </Main>
    )
}

export default Login