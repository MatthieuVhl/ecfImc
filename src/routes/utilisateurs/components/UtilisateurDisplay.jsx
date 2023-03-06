const UtilisateurDisplay = (props) => {
    const utilisateur = props.utilisateur
    const isLogged = props.isLogged
    const setSelectedUtilisateurAndMode = props.setSelectedUtilisateurAndMode
  
   
  
    return (
      <div className="m-2 border border-info rounded p-3 row">
        <div className="col-8">
          <div className="d-flex align-items-center">
            <h3>{utilisateur.firstname} {utilisateur.lastname}  {utilisateur.poids}  {utilisateur.taille}</h3>
            {isLogged &&<button className="ms-auto btn btn-warning" onClick={() => setSelectedUtilisateurAndMode({utilisateur, mode: 'edit'})}><i className="bi bi-pencil-square"></i></button>}
            {isLogged &&<button className="ms-2 btn btn-danger" onClick={() => setSelectedUtilisateurAndMode({utilisateur, mode: 'delete'})}><i className="bi bi-trash"></i></button>}
          </div>
          <hr />
          <ul>
            <li><b>Email : </b> {utilisateur.email}</li>
            <li><b>Prénom : </b> {utilisateur.firstname}</li>
            <li><b>Nom : </b> {utilisateur.lastname}</li>
            <li><b>Poids : </b> {utilisateur.poids}</li>
            <li><b>Taille : </b> {utilisateur.taille}</li>
           
          </ul>
          <hr />
        </div>
      </div>
    )
  }
  
  export default UtilisateurDisplay

