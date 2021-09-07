import React from 'react'
import Main from '../components/main'
import imagenSignUp from '../imagenes/signup.png'


const SignUp = () => {
    return (
        <Main center={ true }>
           <div className="Signup">
               <img src={imagenSignUp} alt="" className="Signup__img" />
               <div className="FormContainer">
                   <h1 className="Form__titulo">Clontagram</h1>
                   <p className="FormContainer__info">
                       Register with us...
                   </p>
                   <form >
                       <input 
                       className="Form__field" 
                       type="email" 
                       name="email" 
                       placeholder="email"
                       required
                       />
                       <input 
                       className="Form__field" 
                       type="text" 
                       name="fullname" 
                       placeholder="Full name"
                       required
                       minLength="3"
                       maxLength="100"
                       />
                       <input 
                       className="Form__field" 
                       type="text" 
                       name="username" 
                       placeholder="Username"
                       required
                       minLength="3"
                       maxLength="30"
                       />
                       <input 
                       className="Form__field" 
                       type="text" 
                       name="bio" 
                       placeholder="tell us about you..."
                       required
                       minLength="3"
                       maxLength="150"
                       />
                       <input 
                       className="Form__field" 
                       type="password" 
                       name="password" 
                       placeholder="password"
                       required
                       />
                       <button 
                       className="Form__submit" 
                       type="submit">Sign Up</button>
                       <p 
                       className="FormContainer__info">
                        already have an account?
                        <a href="/login">Login</a>
                        </p>
                   </form>

               </div>

           </div>
        </Main>
    )
}

export default SignUp