import { createSlice } from "@reduxjs/toolkit"

const UtilisateurSlice = createSlice({
    name:"utilisateur",
    initialState:{
        utilisateur:[],
        isLoading:false,
        error:null
    },
  reducers: {
    addUtilisateur(state, action){
     state.utilisateur.push(action.payload)   
    },
    editUtilisateur(state, action){
        state.utilisateur = [...state.utilisateur.filter(u => u.id !== action.payload.id), action.payload]
    },
    deleteUtilisateur(state, action){
state.utilisateur = state.contact.filter(u => u.id !== action.payload)
    }
  }
})



export const {addUtilisateur, editUtilisateur,deleteUtilisateur } = UtilisateurSlice.actions
export default UtilisateurSlice.reducer