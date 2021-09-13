import React, { useState } from 'react'

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import Loading from '../components/loading'
import Main from '../components/main'
import axios from 'axios'




const Upload = ({ history, showError }) => {

    const [ imageUrl,setImageUrl ] = useState('')
    const [ loadingImage, setLoadingImage ] = useState(false)
    const [ sendingPost, setSendingPost ] = useState(false)
    const [ caption, setCaption ] = useState('')

    const handleChosenImage = async(e) => {
        
        try {
            setLoadingImage(true)
            setTimeout(async()=> {
                const file = e.target.files[0]
                const config = {
                    headers:{
                        'Content-Type': file.type
                    }
                }
                const { data } = await axios.post('/api/posts/upload', file, config) 
                console.log(data)
                setImageUrl(data.url)
                setLoadingImage(false)
            },2000)
            
            
            
            
        } catch (error) {
            setLoadingImage(false)
            showError(error.response.data)
            console.log(error)
        }

    }

    
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(caption)
        if (sendingPost) {
            return
        }
        if (loadingImage){
            showError('Image has not being uploaded yet...')
            return
        }
       
        if (!imageUrl){
            showError('Yo need to choose an Image')
        }

        try {
            setSendingPost(true)
            const body = {
               url: imageUrl,
               caption: caption
            }
       
            await axios.post('/api/posts', body)
            setSendingPost(false)
            history.push('/')       
                   
           } catch (error) {
               showError(error.response.data)
           }
    }

    return (
        <Main>
            <div className="Upload">
                <form onSubmit={(e)=> handleSubmit(e)}>
                    <div className="Upload__image-section">
                        <LoadImageSection 
                        loadingImage={loadingImage}
                        imageUrl={imageUrl}
                        handleChosenImage={handleChosenImage}
                        />
                    </div>
                    <textarea
                    onChange={(e)=> setCaption(e.target.value)}
                    value={caption} 
                    name="caption" 
                    className="Upload__caption"
                    // required
                    maxLength="180"
                    placeholder="Caption your post"
                    />
                    <button className="Upload__submit" type="submit">Post</button>
                </form>
            </div>
        </Main>
        
    )
}

const LoadImageSection = ({ loadingImage, imageUrl, handleChosenImage }) => {

    if (loadingImage){
        return(
            <Loading/>
        )    
    }else if(imageUrl){
        return <img src={imageUrl} alt="this is something"/>
    }else{
        return(
            <label className="Upload__image-label">
                <FontAwesomeIcon  
                icon={faUpload}/>
                <span>Post a Picture...</span>
                <input
                onChange={(e)=> handleChosenImage(e)} 
                type="file" 
                className="hidden" 
                name="image" />
            </label>
        )

    }
    
}

export default Upload