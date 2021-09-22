import axios from 'axios'

export const toggleFriendship = async(profileOwner) => {
    let updatedUser

    if (profileOwner.siguiendo){
        await axios.delete(`/api/amistades/${profileOwner._id}/eliminar`) 
        updatedUser = {
            ...profileOwner, 
            numSeguidores: profileOwner.numSeguidores - 1,
            siguiendo: false 
        }
    } else {
        await axios.post(`/api/amistades/${profileOwner._id}/seguir`)
        updatedUser = {
            ...profileOwner, 
            numSeguidores: profileOwner.numSeguidores + 1,
            siguiendo: true 
        }
    }
    return updatedUser
}