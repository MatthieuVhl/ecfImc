import { createSlice } from "@reduxjs/toolkit"

const UtilisateurSlice = createSlice({
    name:"utilisateur",
    initialState:{
        utilisateur:[],
        isLoading:false,
        error:null
    },
  
})



export default UtilisateurSlice