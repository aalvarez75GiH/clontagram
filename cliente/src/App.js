import React from 'react'
import Nav from './components/nav'
import SignUp from './views/signUp'

// export default function App() {
//   return <h1>¡Bienvenido al curso!</h1>;
// }

const App = () => {
  return (
  <React.Fragment>
    <Nav />
    <SignUp/>
  </React.Fragment>

  ) 
}

export default App