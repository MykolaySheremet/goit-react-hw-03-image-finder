import { Component } from "react";
import { Serchbar } from "./Serchbar/Serchbar";
import { ToastContainer} from 'react-toastify';
 import { toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';
import { FechCSerchImages } from 'servises/serchimages-api';
import { Loader } from "./Loader/Loader";
import { ButtonMore } from './Button/Button';




export class App extends Component {

  state =  {
    searchPictures: '',
    page: 1,
    perPage: 12,
    error: null,
    status: "idle",
    loadingmore: false,
    findPictures: {},
  }

  handleSerchImages = (searchPictures) => {
    
    this.setState({ searchPictures });
    this.setState({ page: 1 });
    this.setState({ loadingmore:false });

    
    
  }



  componentDidUpdate(prevProps, prevState) {

    // console.log(prevState.searchPictures);
    // console.log(this.state.searchPictures);
    // console.log("предид",prevState.page);
    // console.log(prevState.page === this.state.page );

    if (prevState.searchPictures !== this.state.searchPictures || 
        prevState.page !== this.state.page) {

            this.setState({ status: "pending" });
            
            const{searchPictures, page, perPage, } = this.state

            FechCSerchImages(searchPictures, page, perPage) 
            .then(({ total, totalHits, hits }) => {
                    
                        if (total === 0) {
                            this.setState({ status: "rejected" })
                            return Promise.reject(new Error(`Sorry, but we can't find ${searchPictures}. Try again.`))
                        }
              if (totalHits > perPage) {
                           
                        this.setState({loadingmore: true})
                        }
              if (page === Math.ceil(totalHits / perPage)) {
                console.log('виполняюсь');
                this.setState({loadingmore: false });
                toast.warn("wow wo wow ow  !", {
        position: toast.POSITION.BOTTOM_LEFT
      });
                
              }
                
              this.setState({ findPictures: { total, totalHits, hits }, status: "resolved" })
              
                    
                })
            .catch(error => this.setState({ error, status: "rejected" }))

        }
  }
  
  loadMore = () => {
    this.setState(prevState => ({page: prevState.page+1}))
    // console.log(this.state.page)
  }

  render() {
          
           
            
            const { findPictures, status, error, loadingmore} = this.state;

        if (status === "idle") {
          return (
            <>
              <Serchbar propSubmit={this.handleSerchImages} />
              <ToastContainer autoClose={1500}></ToastContainer>
            </>
            )
        }

        if (status === "pending") {
          return (<>
              <Serchbar propSubmit={this.handleSerchImages} />
                <Loader>
            </Loader>
            <ToastContainer autoClose={1500}></ToastContainer>
            
            </>
                
            )
        }

        if (status === "rejected") {
          return (<>
            <Serchbar propSubmit={this.handleSerchImages} />
            <h1>
                {error.message}
            </h1>
            <ToastContainer autoClose={1500}></ToastContainer>
          </>
            )
        }
          if (status === 'resolved') {
            return (
              <div
                style={{
                  // display: 'flex',
                  justifyContent: 'center',
                  flexDirection: "column",
                  alignItems: 'center',
                  fontSize: 20,
                  color: '#010101',
                  paddingBottom: 24,
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gridGap: '16px',

                }}>
                <Serchbar propSubmit={this.handleSerchImages} />

                <ImageGallery pictureSerch={findPictures}>
                </ImageGallery >
                {loadingmore && <ButtonMore onClick={this.loadMore}></ButtonMore>}
                
                <ToastContainer autoClose={1500} />
              </div>
            );
          }
    
    
  }

};
