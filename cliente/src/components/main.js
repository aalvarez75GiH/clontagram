import React from 'react'

const Main = ({ children, center }) => {
    console.log(center)
    let classes = `Main ${center ? 'Main--center' : ''}`
    return (
        <main className={classes}>
            { children }
        </main>
    )  
}

export default Main