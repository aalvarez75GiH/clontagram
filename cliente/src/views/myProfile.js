import React, { useEffect, useState } from 'react' 
import Main from '../components/main'
import axios from 'axios'
import Grid from '../components/grid'
import Loading from '../components/loading'
import DoNotExist from '../components/DoNotExist'
import AvatarImage from '../components/avatarImage'



const MyProfile = ({ match, user, onHandleLogout, showError }) => {
    
    const path = match.params.username
    console.log(path)

    
    const [ profileOwner, setProfileOwner ] = useState(null)
    const [ loadingProfile, setLoadingProfile ] = useState(false)
    const [ posts, setPosts ] = useState([])
    const [profileNotExist, setProfileNotExist] = useState(false)
    const [ loadingImage, setLoadingImage ] = useState(false) 

    useEffect(() => {
        
        const initialDataLoad = async() => {
            
            const { data: user } = await axios.get(`/api/usuarios/${path}`)
            const { data: posts } = await axios.get(`/api/posts/usuario/${user._id}`)
            setProfileOwner(user)
            setPosts(posts)
        }
        initialDataLoad()
    },[])
    console.log(profileOwner)
    console.log(posts)
    console.log(user)
    

    const switchingNavBars = () => {
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

    if (profileOwner === null){
        return null
    }

    if (loadingProfile){

        return (
        <Main center>
            <Loading/>
        </Main>
        
        )
    }

    if (profileOwner._id === user._id){
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
                
                
                <div className="Explore__section">
                    <h2 className="Explore__title">My Posts</h2>
                    <Grid posts={posts}/>                
                </div>

            </Main>
            
        )
    }

    return (
        <Main center>
            <h1>This is profile is from {profileOwner.nombre} </h1>
        </Main>
        
    )
    
    
}

export default MyProfile

