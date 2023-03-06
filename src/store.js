import UtilisateurSlice from "./routes/utilisateurs/components/UtilisateurSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    contacts: UtilisateurSlice
  }
})

export default store