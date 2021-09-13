import React, { useState, useEffect } from 'react' 
import Main from '../components/main'
import axios from 'axios'
import Loading from '../components/loading'
import NoPosts from './noPosts'
import Post from '../components/post'


const loadingPosts = async(dateLastPost) => {
    const query = dateLastPost ? `?fecha=${dateLastPost}` : ''
    const { data: nuevosPosts } = await axios.get(`/api/posts/feed${query}`)
    return nuevosPosts
}

const Feed = ({ showError }) => {

    const [ posts, setPosts ] = useState([])
    const [loadingInitialPosts, setLoadingInitialPosts] = useState(true)
    
    useEffect(()=> {
        const initialLoad = async()=> {
            try {
                // setTimeout(async()=> {
                    const newPosts = await loadingPosts()
                    setPosts(newPosts)
                    console.log(newPosts)
                    setLoadingInitialPosts(false)
                // },2000)
            } catch (error) {
                showError('We are having issues to load the Feed...')
                console.log(error)
            }
        }
        
        initialLoad()
            
    },[])
    

    const postsList = posts.map((post)=> {
        return(
            <Post 
            key={post._id} 
            post={ post }/>
        ) 
    })
    

    if (loadingInitialPosts){
        return(
            <Main center>
                <Loading/>
            </Main>
        ) 
    }

    if (!loadingInitialPosts && posts.length === 0){
        return (
            <Main center>
                <NoPosts/>
            </Main>
        ) 
    }
    
    return (

        <Main center>
            <div className="Feed">
                { postsList }
                {/* {JSON.stringify(posts)} */}
            </div>
        </Main>
        
    )
}





export default Feed

