import React, { useState, useEffect } from 'react' 
import Main from '../components/main'
import axios from 'axios'
import Loading from '../components/loading'
import NoPosts from './noPosts'
import Post from '../components/post'
import LoadMore from '../components/loadMore'


const loadingPosts = async(dateLastPost) => {
    const query = dateLastPost ? `?fecha=${dateLastPost}` : ''
    const { data: nuevosPosts } = await axios.get(`/api/posts/feed${query}`)
    return nuevosPosts
}

const Feed = ({ showError, user }) => {

    const [ posts, setPosts ] = useState([])
    const [ loadingInitialPosts, setLoadingInitialPosts ] = useState(true)
    const [ loadingMore, setLoadingMore ] = useState(false)
    const [ allPostsLoaded, setAllPostsLoaded ] = useState(false) 
    const MAX_AMOUNT_POSTS_BY_LOAD = 3
    
    useEffect(()=> {
        const initialLoad = async()=> {
            try {
                setTimeout(async()=> {
                    const newPosts = await loadingPosts()
                    setPosts(newPosts)
                    setLoadingInitialPosts(false)
                    lookingForMorePosts(newPosts)
                 },2000)
            } catch (error) {
                showError('We are having issues to load the Feed...')
                console.log(error)
            }
        }
        
        initialLoad()
            
    },[showError])
    

    const updatePost = (originalPost, updatedPost ) => {
        setPosts((posts)=> {
            const updatedPosts = posts.map((post)=> {
                if (post !== originalPost){
                    return post
                }
                return updatedPost
            })
            return updatedPosts
        })
    }
    

    const handleMorePosts = async(e) => {
        
        if (loadingMore){
            return
        }

        try {
            setLoadingMore(true)
            const dateLastPost = posts[posts.length-1].fecha_creado
            const newPosts = await loadingPosts(dateLastPost)
            setPosts( posts => [...posts, ...newPosts])
            setLoadingMore(false)
            lookingForMorePosts(newPosts)            
        } catch (error) {
            showError('We are having some problems to load more posts...')
            setLoadingMore(false) 
        }
    }

    const lookingForMorePosts = (newPosts) => {
        if (newPosts.length < MAX_AMOUNT_POSTS_BY_LOAD){
            setAllPostsLoaded(true)
            console.log('There are no more posts...')
        }
    }


    const postsList = posts.map((post)=> {
        return(
            <React.Fragment>
                <Post 
                key={post._id}
                post={ post }
                updatePost={ updatePost }
                showError = { showError }
                user={ user }
                />
            </React.Fragment>
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
                <LoadMore 
                onClick={(e) => handleMorePosts(e)}
                showError={showError}
                isLoad={ allPostsLoaded }
                />
            </div>
        </Main>
        
    )
}





export default Feed

