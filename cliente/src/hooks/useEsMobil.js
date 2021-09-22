import { useState, useEffect } from 'react'



const useEsMobil = () => {
const [ esMobil, setEsMobil ] = useState(null)

    useEffect(()=> {
        const mql = window.matchMedia('(min-width: 576px)')
        mql.addEventListener("change", ()=> {
            if (mql.matches){
                setEsMobil(false)
            }else{
                setEsMobil(true)
            }
        })

            
    //     return ()=> {
    //         removeEventListener("change")  
    // }
    },[])

    return esMobil
}

export default useEsMobil