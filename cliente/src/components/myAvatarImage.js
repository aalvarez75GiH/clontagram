import React from 'react'
import Loading from './loading'
import stringToColor from 'string-to-color'



const MyAvatarImage = ({
    switchingNavBars,
    profileOwner,
    handleSelectedImage,
    loadingImage,
    imageUrl
}) => {
    let content
    
    if (loadingImage){
        content = <Loading/>
    }else if (profileOwner){
        content = (
            <div className="myAvatarContainer">
                <div className="imageCont">
                    <img
                        src={imageUrl}
                        alt={profileOwner.bio} 
                        className="Perfil__img-placeholder Perfil__img-placeholder--pointer">
                    </img>
                </div>
                <div className="buttonCont">
                    <input
                        onChange={(e)=> handleSelectedImage(e)} 
                        type="file"
                        className="custom-file-input"
                        >
                        
                    </input>
                </div>
               
               
            </div>
            // <input
            //     onChange={(e)=> handleSelectedImage(e)} 
            //     type="file" 
            //     className="hidden" 
            //     name="image" >
                
            // </input>
            
            
            
            // <label className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
            // style={{
            //     backgroundImage: profileOwner.imagen ? `url(${profileOwner.imagen})` : null,
            //     backgroundColor: stringToColor(profileOwner.username)
            // }}
            // >
            //     <input
            //     onChange={(e)=> handleSelectedImage(e)} 
            //     type="file" 
            //     className="hidden" 
            //     name="image" />
            // </label>
        )
        
    }else {
        content = (
            <label className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
            style={{
                backgroundImage: profileOwner.imagen ? `url(${profileOwner.imagen})` : null,
                backgroundColor: stringToColor(profileOwner.username)
            }}>  
            </label>
        )
    }
    return (
        <div className="Perfil__img-container">
            { content }
        </div>

    )
}

export default MyAvatarImage