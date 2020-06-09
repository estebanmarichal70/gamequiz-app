import React from 'react';
import Modal from 'react-modal';
import "../assets/sass/App.scss";
import { toast } from "react-toastify";
import { animations } from 'react-animation'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#202225',
      borderRadius          : '10px',
      animation             : animations.fadeIn
    }
  };

  Modal.setAppElement('#root')

export default class CustomModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          input: ""
        };
        this.closeModal = this.closeModal.bind(this);
    }
 
    closeModal(){
        this.setState({input: ""})
        this.props.onModalClose();
  }

  copy = ()  => {
    let copyText = document.getElementById("input");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // celulares
    document.execCommand("copy");

    toast.success("Enlace copiado!")
  }
  
  handleIngresar = () => {
    if(this.state.input)
      this.props.respuesta(this.state.input)
    else
      toast.error("Por favor ingresa una contraseña")
  }

 render(){
    return (
        <div >
          <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          >
            {this.props.LinkOrPassword === "Link" ? 
            (<div>
              <div className="d-flex jc-center">
              <h2 className="subtitulo">Identificador de Partida</h2> 
              </div>
              <div className="d-flex flex-column">
                  <input className="input-modal" type="text" id="input" value={this.props.juegoUUid} readOnly/>
                  <div className="d-flex jc-center mt-20">
                      <button className="rounded-button default" onClick={this.closeModal}>Cerrar</button>
                      <button className="rounded-button default ml-20" onClick={this.copy}>Copiar</button>
                  </div>
              </div>
            </div>)
             : 
             (<div>
              <div className="d-flex jc-center">
              <h2 className="subtitulo">Ingresa la Contraseña</h2> 
              </div>
              <div className="d-flex flex-column">
                  <input className="input-modal" type="password" placeholder="Password" onChange={(e) => {this.setState({input: e.target.value})}} value={this.state.input}/>
                  <div className="d-flex jc-center mt-20">
                      <button className="rounded-button default" onClick={this.closeModal}>Cerrar</button>
                      <button className="rounded-button default ml-20" onClick={this.handleIngresar}>Ingresar</button>
                  </div>
              </div>
            </div>)}
          </Modal>
        </div>
      );
    }
    
}