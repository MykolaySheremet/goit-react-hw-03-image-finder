import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BakcDrop, ModalWindow } from './Modal.styled';
// import { ImageGalleryItemImage } from './ImageGalleryItem.styled';


const modalRoot = document.querySelector('#modal-root');


export class Modal extends Component {

    componentDidMount() {
        console.log('did mount')

        window.addEventListener('keydown', this.handlecloseEscape)
    }

    handlecloseEscape = (e) => {
        console.log('Esc')
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }
    
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlecloseEscape)


        console.log('esc remove')
     }
  


    closeModal = (e) => {
        if (e.target === e.currentTarget) {
            console.log('tru')
            this.props.onClose();
        }
  }



    render() {
        return createPortal(
            <BakcDrop onClick={this.closeModal}>
                <ModalWindow> 
                    {this.props.children}
                </ModalWindow>
            </BakcDrop>,
            
            modalRoot)
    }
        
    
}