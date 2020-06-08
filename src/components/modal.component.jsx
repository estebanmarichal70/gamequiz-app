import React from 'react';
import Modal from 'react-modal';
import "../assets/sass/App.scss";
import { toast } from "react-toastify";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#202225',
      borderRadius          : '10px'
    }
  };

  Modal.setAppElement('#root')

export default class CustomModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.closeModal = this.closeModal.bind(this);
    }
 
    closeModal(){
        this.props.onModalClose();
  }

  copy = ()  => {
    let copyText = document.getElementById("input");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // celulares
    document.execCommand("copy");

    toast.success("Enlace copiado!")
  }
  
 render(){
    return (
        <div>
          <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          >
            <div className="d-flex jc-center">
                <h2 className="subtitulo">Identificador de Partida</h2> 
            </div>
            <div className="d-flex flex-column">
                <input className="input-modal" id="input" value={this.props.juegoUUid} readOnly/>
                <div className="d-flex jc-center mt-20">
                    <button className="rounded-button default" onClick={this.closeModal}>Cerrar</button>
                    <button className="rounded-button default ml-20" onClick={this.copy}>Copiar</button>
                </div>
            </div>  
          </Modal>
        </div>
      );
    }
    
}