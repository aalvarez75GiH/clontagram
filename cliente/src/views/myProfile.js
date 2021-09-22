import React, { useEffect, useState } from 'react' 
import Main from '../components/main'
import axios from 'axios'
import Grid from '../components/grid'
import Loading from '../components/loading'
import DoNotExist from '../components/DoNotExist'
import MyAvatarImage from '../components/myAvatarImage'



const MyProfile = ({ match, user, onHandleLogout, showError }) => {
    
    const path = match.params.username
    console.log(path)

    
    const [ profileOwner, setProfileOwner ] = useState(null)
    const [ loadingProfile, setLoadingProfile ] = useState(false)
    const [ posts, setPosts ] = useState([])
    const [profileNotExist, setProfileNotExist] = useState(false)
    const [ loadingImage, setLoadingImage ] = useState(false)
    const [ imageUrl, setImageUrl ] = useState('')


    useEffect(() => {
        
        const initialDataLoad = async() => {
            
            const { data: user } = await axios.get(`/api/usuarios/${path}`)
            const { data: posts } = await axios.get(`/api/posts/usuario/${user._id}`)
            setProfileOwner(user)
            setImageUrl(user.imagen)
            setPosts(posts)
        }
        initialDataLoad()
    },[])
    // console.log(profileOwner)
    // console.log(posts)
    // console.log(user)
    

    const switchingNavBars = () => {
        return profileOwner._id === user._id 
    }

    const handleSelectedImage = async(e) => {
        e.preventDefault()
        try {
            setLoadingImage(true)
            const file = e.target.files[0]
            const config = {
                headers:{
                    'Content-Type': file.type
                }
            }
            const { data } = await axios.post(`/api/usuarios/upload`, file, config)
            console.log(data)
            setImageUrl(data.url)
            // setProfileOwner({ ...profileOwner, imagen: data.url })
            setLoadingImage(false)

        } catch (error) {
            console.log(error)
        }
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
                    <MyAvatarImage
                    switchingNavBars={switchingNavBars}
                    profileOwner={ profileOwner }
                    handleSelectedImage={(e)=> handleSelectedImage(e) }
                    loadingImage={loadingImage}
                    imageUrl={imageUrl}
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
                
                <div className="Perfil__separador"/>
                {/* <h2 className="Explore__title">My Posts</h2> */}
                {/* { posts.length > 0 ? <Grid posts={posts}/> }                     */}
                { posts.length > 0 ? <Grid posts={posts}/> : <NoPostsAvailable/> }
            </Main>
            
        )
    }

    return (
        <Main center>
            <h1>This is profile is from {profileOwner.nombre} </h1>
        </Main>
        
    )
    
  
}
const NoPostsAvailable = () => {
    return <p className="text-center">This user hasn't posted any picture yet...</p>
}

export default MyProfile

