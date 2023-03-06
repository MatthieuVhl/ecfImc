import classes from './modal.module.css'

const Modal = (props) =>{

    const clickHandler = (event) =>{
        if(event.currentTarget === event.target){
            props.onClose()
        }
    }
    return(
        <div className={classes.modal} onClick={clickHandler}>
            <div className={classes.modalContent}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>{props.modalTitle}</h3>
                    <button onClick={() => props.onClose()} className="btn btn-outline-dark rounded-circle">
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                <hr />
                {props.children}
            </div>
        </div>
    )
}

export default Modal