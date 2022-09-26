import { Component } from "react";
import { Serchbar } from "./Serchbar/Serchbar";
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';




export class App extends Component {

  state =  {
      pictureName: '',
  }

  handleSerchImages = (pictureName) => {
    this.setState({pictureName})

  }

  
  render() {
      return(
        <div
                  style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: "column",
                  alignItems: 'center',
                  fontSize: 20,
                  color: '#010101'
                  }}>
          <Serchbar propSubmit={this.handleSerchImages} />

          <ImageGallery pictureSerch={this.state.pictureName}>
          </ImageGallery >

          <ToastContainer autoClose={1500} />
        </div>
      );
    
  }

};
