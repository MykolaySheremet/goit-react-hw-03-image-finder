import { Component } from "react";
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryBox } from './ImageGallery.styled';
import { Loader } from '../Loader/Loader';

const KEY = '29210178-99963cb2fa4a70f711806a762';

export class ImageGallery extends Component {

    state = {
        serchImages: null,
        error: null,
        status: "idle"
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.pictureSerch !== this.props.pictureSerch) {

            this.setState({ status: "pending" });
            
            setTimeout(() => {
                fetch(`https://pixabay.com/api/?key=${KEY}&q=${this.props.pictureSerch}&image_type=photo&orientation=horizontal&per_page=12`)
                    .then(response => {
                        if (response.ok) {
                            // console.log(response);
                            return response.json();
                        }
                        return Promise.reject(
                            new Error(`Sorry, but we can't find ${this.props.pictureSerch}. Try more`)
                        )
                    }).then(({ total, totalHits, hits }) => {
                    
                        if (total === 0) {
                            this.setState({ status: "rejected" })
                            return Promise.reject(new Error(`Sorry, but we can't find ${this.props.pictureSerch}. Try again.`))
                        }

                        this.setState({ serchImages: { total, totalHits, hits }, status: "resolved" })
                    
                    }).catch(error =>
                        this.setState({ error, status: "rejected" }))
                
            }, 500)
            
        
        }
    }


    render() {

        const { serchImages, status, error } = this.state;

        if (status === "idle") {
            return (<div>
                Input  what you want to serch
            </div>)
        }

        if (status === "pending") {
            return (
                <Loader>
                </Loader>
            )
        }

        if (status === "rejected") {
            console.log(error.message);
            return (<h1>
                {error.message}
            </h1>)
        }
         
        if (status === "resolved") {
            return (
                <ImageGalleryBox>
                    {serchImages.hits.map(({ id, webformatURL, tags, largeImageURL }) => <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags}></ImageGalleryItem>)}
                </ImageGalleryBox>
            )
        }
    }
}