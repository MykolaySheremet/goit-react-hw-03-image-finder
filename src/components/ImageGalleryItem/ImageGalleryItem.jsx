import { Component } from "react";
import { ImageGalleryItems, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

// export class Serchbar extends Component {
//     state={
//         searchPictures: '',
//         modalIsOpen: false,
//     }


export class ImageGalleryItem extends Component {

    state = {
        modalIsOpen: false,
    };

    togglModal = () => {
        console.log('визиваюсь')
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }))
        // console.log(this.state.modalIsOpen);
    }

    // closeModal = () => {
    //     this.setState({modalIsOpen: false,})
    // }
    

    render() {
        
        const {webformatURL, tags, largeImageURL} = this.props
        //   console.log(this.state.modalIsOpen)
        return (
           <> 
                <ImageGalleryItems>
                <ImageGalleryItemImage
                    src={webformatURL}
                    alt={tags}
                width="240"  onClick={this.togglModal}/>
                </ImageGalleryItems>
                {this.state.modalIsOpen &&
                    <Modal onClose={this.togglModal}>
                        <img
                            src={largeImageURL}
                            alt={tags}
                        ></img>
                    </Modal>}
            </>
    
        )
        
    }
    
    
}
    

