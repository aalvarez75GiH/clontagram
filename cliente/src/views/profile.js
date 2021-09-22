import React, { useEffect, useState } from 'react' 
import Main from '../components/main'
import axios from 'axios'
import Grid from '../components/grid'
import Loading from '../components/loading'
import DoNotExist from '../components/DoNotExist'
import AvatarImage from '../components/avatarImage'
import FollowButton from '../components/followButton'
import LogOutButton from '../components/logOutButton'
import DescriptionProfile from '../components/descriptionProfile'
import { toggleFriendship } from '../helpers/friendship-helpers'
import useEsMobil from '../hooks/useEsMobil'

const Profile = ({ match, user, onHandleLogout, showError }) => {
    
    const path = match.params.username

    const [ profileOwner, setProfileOwner ] = useState(null)
    const [ loadingProfile, setLoadingProfile ] = useState(true)
    const [ posts, setPosts ] = useState([])
    const [profileNotExist, setProfileNotExist] = useState(false)
    const [ loadingImage, setLoadingImage ] = useState(false) 
    const [ togglingFriendship, setTogglingFriendship ] = useState(false)
    const esMobil = useEsMobil()

    useEffect(()=> {
        const initialDataLoad = async() => {
            setTimeout(async()=>{
                try {
                    
                    setLoadingProfile(true)
                    const { data: user } = await axios.get(`/api/usuarios/${path}`)
                    const { data: posts } = await axios.get(`/api/posts/usuario/${user._id}`)
    
                    setProfileOwner(user)
                    console.log(user)
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

    const validatingUserOwnership = () => {
        return profileOwner._id === user._id 
        
    }

    const handleSelectedImage = async(e) => {

        try {
            setLoadingImage(true)
            const file = e.target.files[0]
            const config = {
                headers:{
                    'Content-Type': file.type
                }
            }
            const { data } = await axios.post(`/api/usuarios/upload`, file, config)
            setProfileOwner({ ...profileOwner, imagen: data.url})
            setLoadingImage(false)

        } catch (error) {
            showError(error.reponse.data)
            setLoadingImage(false)
            console.log(error)
        }
    }



    const handlingFriendship = async() => {
        if (togglingFriendship){
            return
        }    
        try {
            setTogglingFriendship(true)
            const updatedUser = await toggleFriendship(profileOwner)
            setProfileOwner(updatedUser)
            setTogglingFriendship(false)
        } catch (error) {
            showError('We could not manage your following request...')
            setTogglingFriendship(false)
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
                    profileOwner={ profileOwner }
                    handleSelectedImage={ handleSelectedImage }
                    loadingImage={loadingImage}
                    />
                    <div className="Perfil__bio-container">
                        <div className="Perfil__bio-heading">
                            <h2 className="capitalize">{profileOwner.username}</h2>
                            { !validatingUserOwnership() && (
                                <FollowButton
                                following={profileOwner.siguiendo}
                                handlingFriendship={ handlingFriendship }
                            />)}
                            { validatingUserOwnership() && <LogOutButton logOut={onHandleLogout}/>}  
                        </div>
                        { !esMobil && (
                            <DescriptionProfile profileOwner={ profileOwner }/>
                        )}
                       
                    </div>
                </div>
                { esMobil && (
                    <DescriptionProfile profileOwner={ profileOwner }/>
                )}
                <div className="Perfil__separador"/>
                <h2 className="Explore__title">My Posts</h2>
                { posts.length > 0 ? <Grid posts={posts}/> : <NoPostsAvailable />}
        </Main>
        
    )
    
    
}


const NoPostsAvailable = () => {
    return <p className="text-center">This user hasn't posted any picture yet...</p>
}

export default Profile

