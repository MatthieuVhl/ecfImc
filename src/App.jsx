
import { useEffect, useState } from "react";
import { BASE_DB_URL, SIGN_IN_URL, SIGN_UP_URL } from "./firebaseConfig";
import { createPortal } from "react-dom";
import Modal from "./routes/utilisateurs/components/shared/modal";
import UtilisateurForm from "./routes/utilisateurs/components/UtilisateurForm";
import UtilisateurDisplay from "./routes/utilisateurs/components/UtilisateurDisplay";
import SignForm from "./routes/utilisateurs/components/auth/signForm";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [signFormMode, setSignFormMode] = useState("");
  const [UtilisateurFormMode, setUtilisateurFormMode] = useState("");
  const [Utilisateurs, setUtilisateur] = useState([]);
  const [selectedUtilisateur, setSelectedUtilisateur] = useState(null);

  const signFormSubmitHandler = async (credentials) => {
    try {
      const URL = signFormMode === "Sign In" ? SIGN_IN_URL : SIGN_UP_URL;

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(
          "Problème lors de " + signFormMode === "Sign in"
            ? "la connexion"
            : "L'enregistrement"
        );
      }

      const data = await response.json();

      localStorage.setItem("token", data.idToken);
      setIsLogged(true);
      setSignFormMode("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  const refreshUtilisateur = async () => {
    try {
      const response = await fetch(`${BASE_DB_URL}utilisateur.json`);
      if (!response.ok) {
        throw new Error(
          "un soucis a eu lieu lors de la récupération des utilisateurs."
        );
      }
      const data = await response.json();

      const tmpArray = [];
      
      for (const key in data) {
        tmpArray.push({ id: key, ...data[key] });
      }

      setUtilisateur(tmpArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  const setSelectedUtilisateurAndMode = ({ Utilisateur, mode }) => {
    setSelectedUtilisateur(Utilisateur);
    setUtilisateurFormMode(mode);
  };

  const addUtilisateurHandler = async (Utilisateur) => {
    if (isLogged) {
      const token = localStorage.get.Item("token");
      if (token) {
        try {
          const response = await fetch(
            `${BASE_DB_URL}utilisateur.json?auth=${token}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(Utilisateur),
            }
          );
          if (!response.ok) {
            throw new Error(
              "Il y a eu un soucis lors de l'ajout d'un utilisateur."
            );
          }
          const data = await response.json();

          setUtilisateur([...Utilisateurs, { id: data.name, ...Utilisateur }]);
          setUtilisateurFormMode("");
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  };
  const editUtilisateurHandler = async ({ id, ...Utilisateur }) => {
    if (isLogged) {
      const token = localStorage.getItem("token");
      if (token) {
        if (Utilisateur.find((u) => u.id === id)) {
          try {
            const response = await fetch(
              `${BASE_DB_URL}utilisateurs/${id}.json?auth=${token}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(Utilisateur),
              }
            );

            if (!response.ok) {
              throw new Error(
                "Il y a eu un soucis lors de l'édition de l'utilisateur."
              );
            }

            const data = await response.json();

            setUtilisateur([
              ...Utilisateur.filter((u) => u.id !== id),
              { id, ...data },
            ]);
            setUtilisateurFormMode("");
          } catch (error) {
            console.error(error.message);
          }
        }
      }
    }
  };
  const deleteUtilisateurHandler = async (UtilisateurId) => {
    if (isLogged) {
      const token = localStorage.getItem("token");
      if (token) {
        if (Utilisateurs.find((u) => u.id === UtilisateurId)) {
          try {
            const response = await fetch(
              `${BASE_DB_URL}contacts/${UtilisateurId}.json?auth=${token}`,
              {
                method: "DELETE",
              }
            );

            if (!response.ok) {
              throw new Error(
                "Il y a eu un soucis lors de la suppression du contact."
              );
            }

            setUtilisateur([
              ...Utilisateurs.filter((u) => u.id !== UtilisateurId),
            ]);
            setUtilisateurFormMode("");
          } catch (error) {
            console.error(error.message);
          }
        }
      }
    }
  }
useEffect(()=>{
  refreshUtilisateur();
}, [])
  

  return (
    <div className="App">
      {signFormMode === "Sign In" &&
        createPortal(
          <Modal onClose={() => setSignFormMode("")} modalTitle={"Sign In"}>
            <SignForm mode="Sign In" onSubmit={signFormSubmitHandler} />
          </Modal>,
          document.getElementById("modal-root")
        )}
      {signFormMode === "Sign Up" &&
        createPortal(
          <Modal onClose={() => setSignFormMode("")} modalTitle={"Sign Up"}>
            <SignForm mode="Sign Up" onSubmit={signFormSubmitHandler} />
          </Modal>,
          document.getElementById("modal-root")
        )}
      {UtilisateurFormMode === "add" &&
        createPortal(
          <Modal
            onClose={() => setUtilisateurFormMode("")}
            modalTitle="Add Utilisateur"
          >
            <UtilisateurForm mode="add" onAdd={addUtilisateurHandler} />
          </Modal>,
          document.getElementById("modal-root")
        )}
      {UtilisateurFormMode === "edit" &&
        createPortal(
          <Modal
            onClose={() => setUtilisateurFormMode("")}
            modalTitle="Edit Utilisateur"
          >
            <UtilisateurForm
              mode="edit"
              onEdit={editUtilisateurHandler}
              Utilisateur={selectedUtilisateur}
            />
          </Modal>,
          document.getElementById("modal-root")
        )}
      {UtilisateurFormMode === "delete" &&
        createPortal(
          <Modal
            onClose={() => setUtilisateurFormMode("")}
            modalTitle="Delete Utilisateur"
          >
            <UtilisateurForm
              mode="delete"
              onDelete={deleteUtilisateurHandler}
              Utilisateur={selectedUtilisateur}
            />
          </Modal>,
          document.getElementById("modal-root")
        )}
      <header>
        <nav
          className="navbar navabar-expand-lg bg-body tertiary"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <span className="navbar-brand" style={{ cursor: "pointer" }}>
              <i className="bi bi-activity"> Imc </i>
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarUtilisateur"
              aria-controls="navbarUtilisateur"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="bi bi-search"></i>
              </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarUtilisateur">
              {isLogged ? (
                <button
                  onClick={logOutHandler}
                  className="ms-auto btn btn-secondary"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setSignFormMode("Sign Up")}
                    className="ms-auto btn btn-outline-info"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => setSignFormMode("Sign In")}
                    className="ms-2 btn btn-primary"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="container">
        <div className="row my-3">
          <div className="col-10 offset-1 rounded bg-dark text-light p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3>Utilisateur</h3>
              {isLogged && <button className="btn btn-success" onClick={()=> setSelectedUtilisateurAndMode({mode:"add"})}><i className="bi bi-plus-circle"></i>Ajouter </button>}
            </div>
           <hr />
           {Utilisateurs.length === 0 ?
           <p>Il n'y a pas d'utilisateur dans la base de données .</p> :
           Utilisateurs.map(Utilisateur => <UtilisateurDisplay isLogged={isLogged} key={Utilisateur.id} Utilisateur ={Utilisateur} setSelectedUtilisateurAndMode ={setSelectedUtilisateurAndMode}/>)}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
