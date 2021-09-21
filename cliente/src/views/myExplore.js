import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Main from '../components/main'
import Loading from '../components/loading'
import ImageAvatar from '../components/imageAvatar'
//import PostItem from '../components/postItem'
import MyPostItem from '../components/myPostItem'

const MyExplore = ({ showError }) => {

    const [ posts, setPosts ] = useState([]) 
    const [ users, setUsers ] = useState([])
    const [ loadingData, setLoadingData ] = useState(true)

    useEffect(() => {
        const initialDataLoading = async() => {
            try { 
                const [ users, posts ] = await Promise.all([ 
                    axios.get('/api/usuarios/explore').then(({ data })=> data), 
                    axios.get('/api/posts/explore').then(({ data })=> data)
                ])
                setPosts(posts)
                setUsers(users)
                setLoadingData(false)
                console.log(posts)
                console.log(users)
            } catch (error) {
                console.log(error)
            }
        }
        initialDataLoading()
        
    },[])


    const renderingUsers = users.map((user) => {
        return (
            <React.Fragment>
                <div 
                className="Explore__usuario" 
                key={user._id}>
                    <ImageAvatar user={ user }/>
                    <p>{user.username}</p>
                    <Link to={`/profile/${user.username}`}>See profile</Link>
                </div>
            </React.Fragment>
        )
    })  

    const renderingPosts = posts.map((post)=> {
        return <MyPostItem key={post._id} { ...post }/>
    })
    

    if (loadingData){
        return (  
            <Main center>      
                <Loading/>
            </Main>
        )
    }

    return (
        <Main>
            <div className="Explore__section">
              <h2 className="Explore__title">Discover other users </h2>  
                <div className="Explore__usuarios-container">
                    { renderingUsers }
                </div> 
            </div>
            
            <div className="myContainer">
                <h2 className="Explore__title">Explore</h2>
               {renderingPosts}
                
                {/* <Grid posts={posts}/>                 */}

            </div>
        </Main>
    )
}

export default MyExplore