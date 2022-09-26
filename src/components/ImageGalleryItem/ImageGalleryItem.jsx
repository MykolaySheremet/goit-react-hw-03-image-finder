import { ImageGalleryItems, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags }) => {

    
    
    return (
            
            <ImageGalleryItems>
                <ImageGalleryItemImage
                    src={webformatURL}
                    alt={tags}
                    width="240"/>
            </ImageGalleryItems>
        )
    }
