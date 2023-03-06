
import {Form, Link, NavLink, Outlet} from 'react-router-dom'
import './App.css';
import { useState } from 'react';
import {BASE_DB_URL,SIGN_IN_URL, SIGN_UP_URL} from ""
import { createPortal } from 'react-dom';
import Modal from './routes/utilisateurs/components/shared/modal';


function App() {
const [isLogged, setIsLogged] = useState(false)
const [signFormMode, setSignFormMode] =useState("") 
const [UtilisateurFormMode, setUtilisateurFormMode] = useState("")
const [Utilisateurs, setUtilisateur] = useState([])
const [selectedUtilisateur, setSelectedUtilisateur] = useState(null)

const signFormSubmitHandler = async (credentials) => {
  try {
    const URL = signFormMode === "Sign In" ? SIGN_IN_URL : SIGN_UP_URL

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if(!response.ok){
      throw new Error ("Problème lors de " + signFormMode === 'Sign in' ?"la connexion" : "L'enregistrement")
    }

    const data = await response.json()

    localStorage.setItem('token', data.idToken)
    setIsLogged(true)
    setSignFormMode("")
  } catch(error){
  console.error(error.message);
}
}

const logOutHandler = () => {
  localStorage.removeItem('token')
  setIsLogged(false)
}

const refreshUtilisateur = async () =>{
  try {
    const response = await fetch(`${BASE_DB_URL}utilisateur.json`)
  if(!response.ok){
    throw new Error("un souci a eu lieu lors de la récupération des utilisateurs.")

  }
  const data = await response.json()

  const tmpArray = []
  for(const key in data){
    tmpArray.push({id: key, ...data[key]})
  }

  setUtilisateur(tmpArray)
  } catch(error){
    console.error(error.message)
  }
}

const setSelectedUtilisateurAndMode = ({Utilisateur, mode}) =>{
  setUtilisateur(Utilisateur)
  setUtilisateurFormMode(mode)
}

const addUtilisateurHandler = async (Utilisateur) => {
  if(isLogged){
    const token = localStorage.get.Item('token')
    if(token){
      try{
        const response = await fetch(`${BASE_DB_URL}utilisateur.json?auth=${token}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Utilisateur)  
        })
        if (!response.ok) {
          throw new Error("Il y a eu un soucis lors de l'ajout d'un utilisateur.")
        }
        const data = await response.json()

        setUtilisateur([... Utilisateurs, {id: data.name, ...Utilisateur}])
        setUtilisateurFormMode("")
      }catch (error){
        console.error(error.message);
      }
    }
  }
}
const editUtilisateurHandler = async ({id, ...Utilisateur}) => {
  if (isLogged) {
    const token = localStorage.getItem('token')
    if (token) {
      if (contacts.find(u => u.id === id)) {
        try {
          const response = await fetch(`${BASE_DB_URL}utilisateurs/${id}.json?auth=${token}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(Utilisateur)
          })

          if (!response.ok) {
            throw new Error("Il y a eu un soucis lors de l'édition de l'utilisateur.")
          }

          const data = await response.json()

          setContacts([...Utilisateur.filter(u => u.id !== id), {id, ...data}])
          setContactFormMode("")
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  }
  
}
const deleteUtilisateurHandler = async (UtilisateurId) => {
  if (isLogged) {
    const token = localStorage.getItem('token')
    if (token) {
      if (Utilisateurs.find(u => u.id === UtilisateurId)) {
        try {
          const response = await fetch(`${BASE_DB_URL}contacts/${UtilisateurId}.json?auth=${token}`, {
            method: "DELETE"
          })

          if (!response.ok) {
            throw new Error("Il y a eu un soucis lors de la suppression du contact.")
          }

          setContacts([...contacts.filter(u => u.id !== UtilisateurId)])
          setContactFormMode("")
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  }
}

useEffect(() => {
  refreshUtilisateur()
}, [])



  return (
    <div className="App">
       {signFormMode === "Sign In" && createPortal(<Modal onClose={() => setSignFormMode("")} modalTitle={"Sign In"}>
        <SignForm mode="Sign In" onSubmit={signFormSubmitHandler} />
        </Modal>, document.getElementById("modal-root"))}
      {signFormMode === "Sign Up" && createPortal(<Modal onClose={() => setSignFormMode("")} modalTitle={"Sign Up"}>
        <SignForm mode="Sign Up" onSubmit={signFormSubmitHandler} />
      </Modal>, document.getElementById("modal-root"))}
      {contactFormMode === "add" && createPortal(<Modal onClose={() => setContactFormMode("")} modalTitle="Add Contact">
        <ContactForm mode="add" onAdd={addContactHandler} />
      </Modal>, document.getElementById("modal-root"))}
      {contactFormMode === "edit" && createPortal(<Modal onClose={() => setContactFormMode("")} modalTitle="Edit Contact">
        <ContactForm mode="edit" onEdit={editContactHandler} contact={selectedContact} />
      </Modal>, document.getElementById("modal-root"))}
      {contactFormMode === "delete" && createPortal(<Modal onClose={() => setContactFormMode("")} modalTitle="Delete Contact">
        <ContactForm mode="delete" onDelete={deleteContactHandler} contact={selectedContact} />
      </Modal>, document.getElementById("modal-root"))}
      <header>
      <nav className='navbar navabar-expand-lg bg-body tertiary' data-bs-theme="dark">
        <div className='container-fluid'>
          <Link className="navbar-brand" to={'/'}><i className='bi bi-activity'> Imc </i></Link>
          <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'><i className='bi bi-search'></i></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className=" nav-link" to={'/'}>Accueil</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className=" nav-link" to={'/utilisateurs'}>Utilisateur</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </header>
      <div className='container'>
        <div className='row my-3'>
          <div className="col-10 offset-1 bg-dark text-light p-3 rounded">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
