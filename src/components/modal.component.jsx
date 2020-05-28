import React from 'react';
import Modal from 'react-modal';
import "../assets/sass/App.scss";
import "../assets/empezar.scss";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#202225'
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

 render(){
    return (
        <div>
          <Modal
            isOpen={this.props.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="d-flex jc-center">
                <h2 className="subtitulo" ref="custom-modal">Enlace</h2> 
            </div>
            <div className="d-flex flex-column">
                <input className="input-link" value="http://Ellinkdeljuego/gamequiz/inicio" />
                <div className="d-flex jc-center mt-20">
                    <button className="rounded-button default" onClick={this.closeModal}>Cerrar</button>
                    <button className="rounded-button default ml-20"> Copiar</button>
                </div>
            </div>  
          </Modal>
        </div>
      );
    }
    
}