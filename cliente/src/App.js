import React, { useState } from 'react'
import Nav from './components/nav'
import SignUp from './views/signUp'
import Login from './views/login'
import { setToken, deleteToken } from './helpers/auth-helpers'
import axios from 'axios'


const App = () => {

const [ user, setUser ] = useState(null)

const login = async (email, password) => {
  const { data } = await axios.post('/api/usuarios/login', {
    email,
    password
  })
  setUser(data.usuario)
  setToken(data.token)
}

const signUp = async (user) => {
  const { data } = await axios.post('/api/usuarios/signup', user)
  setUser(data.usuario)
  setToken(data.token)
}
// console.log(user)
 
const logOut = () => {
    setUser(null)
    deleteToken()
}


return (

  <React.Fragment>
      <Nav />
      {/* <SignUp signUp={signUp}/> */}
      <Login login={login}/>
      <div>{ JSON.stringify(user) }</div>
  </React.Fragment>

  ) 
}

export default App