import React, { useEffect, useState } from 'react' 
import Main from '../components/main'
import axios from 'axios'
import Grid from '../components/grid'
import Loading from '../components/loading'
import DoNotExist from '../components/DoNotExist'
import AvatarImage from '../components/avatarImage'



const Profile = ({ match, user, onHandleLogout, showError }) => {
    
    const path = match.params.username

    const [ profileOwner, setProfileOwner ] = useState(null)
    const [ loadingProfile, setLoadingProfile ] = useState(true)
    const [ posts, setPosts ] = useState([])
    const [profileNotExist, setProfileNotExist] = useState(false)
    const [ loadingImage, setLoadingImage ] = useState(false) 

    useEffect(()=> {
        const initialDataLoad = async() => {
            setTimeout(async()=>{
                try {
                    
                    setLoadingProfile(true)
                    const { data: user } = await axios.get(`/api/usuarios/${path}`)
                    const { data: posts } = await axios.get(`/api/posts/usuario/${user._id}`)
    
                    setProfileOwner(user)
                    setPosts(posts)
                    setLoadingProfile(false)
                    
                } catch (error) {
                    if (error.response && 
                        (error.response.status === 404 || error.response.status === 400)){
                            setProfileNotExist(true)
                    }else{
                        showError('We are having issues to load the Post data...')
                        setLoadingProfile(false)
                    }
                    
                }
            },2000)
            
        }
        initialDataLoad()
        
        
    },[path])

    const switchingNavBars = ({}) => {
        return profileOwner._id === user._id 
        
    }

const handleSelectedImage = () => {
    console.log('testing images')
}

    if (profileNotExist){
        return (
            <Main center>
                <DoNotExist message='This profile does not Exist...'/>
            </Main>
        )
    }

    if (loadingProfile){
        return(
            <Main center>          
                <Loading/>
            </Main>
        ) 
    }

    if (profileOwner === null){
        return null
    }

    
    return (
        <Main center>
                <div className="Perfil">
                    <AvatarImage
                    switchingNavBars={switchingNavBars}
                    profileOwner={ profileOwner }
                    handleSelectedImage={ handleSelectedImage }
                    loadingImage={loadingImage}
                    />
                    <div className="Perfil__bio-container">
                        <div className="Perfil__bio-heading">
                            <h2 className="capitalize">{user.username}</h2>
                            <button
                            onClick={onHandleLogout} 
                            className="Perfil__boton-logout">Log out</button>
                        </div>
                        <div className="Perfil__descripcion">
                            <h2 className="Perfil__nombre">{user.nombre}</h2>
                            <p>{user.username}</p>
                            <p className="Perfil__estadisticas">
                                <b>{user.numSiguiendo}</b>      fallowing
                                    <span className="ml-4">
                                        <b>{user.numSeguidores}</b>     fallowers
                                    </span>
                            </p>
                        </div>
                    </div>
                </div>



            {/* <AvatarImage
            switchingNavBars={switchingNavBars}
            profileOwner={ profileOwner }
            handleSelectedImage={ handleSelectedImage }
            loadingImage={loadingImage}
            />
            <h1>This is profile </h1> */}
        </Main>
        
    )
    
    
}

export default Profile

