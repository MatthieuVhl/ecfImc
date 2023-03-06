import { useRef } from "react";

const UtilisateurForm = () => {
  const mode = props.mode;
  const utilisateur = props.utilisateur;

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const poidsRef = useRef();
  const tailleRef = useRef();
  const imcRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (mode === "delete") {
      props.onDelete(utilisateur.id);
    } else {
      const firstname = firstnameRef.current.value;
      const lastname = lastnameRef.current.value;
      const poids = poidsRef.current.value;
      const taille = tailleRef.current.value;
      

      const newUtilisateurValues = {
        firstname,
        lastname,
        poids,
        taille,
        
      };
      firstnameRef.current.value = "";
      lastnameRef.current.value = "";
      poidsRef.current.value = "";
      tailleRef.current.value = "";
  

      if (mode === "add") {
        props.onAdd(newUtilisateurValues);
      } else if (mode === "edit") {
        props.onEdit({ ...newUtilisateurValues, id: utilisateur.id });
      }
    }
  };

  return(
   <form onSubmit={submitFormHandler}>
      <div className="mb-3">
         <label htmlFor="firstname" className="form-label">Prénom :</label>
<input type="text" className="form-control" ref={firstnameRef} disabled={mode === "delete"} required={mode !==" delete"} defaultValue={utilisateur?.firstname} />
      </div>
      <div className="mb-3">
         <label htmlFor="firstname" className="form-label">Nom :</label>
<input type="text" className="form-control" ref={lastnameRef} disabled={mode === "delete"} required={mode !==" delete"} defaultValue={utilisateur?.lastname} />
      </div>
      <div className="mb-3">
         <label htmlFor="firstname" className="form-label">Poids :</label>
<input type="text" className="form-control" ref={poidsRef} disabled={mode === "delete"} required={mode !==" delete"} defaultValue={utilisateur?.poids} />
      </div>
      <div className="mb-3">
         <label htmlFor="firstname" className="form-label">Taille :</label>
<input type="text" className="form-control" ref={tailleRef} disabled={mode === "delete"} required={mode !==" delete"} defaultValue={utilisateur?.taille} />
      </div>
      <div className="text-end">
        <button className={`btn btn-${mode === 'delete' ? 'danger' : mode === 'edit' ? 'warning' : 'success'}`}>{mode === 'delete' ? 'Confirmer' : mode === 'edit' ? 'Editer' : 'Ajouter'}</button>
      </div>
   </form>
  )
};

export default UtilisateurForm;
