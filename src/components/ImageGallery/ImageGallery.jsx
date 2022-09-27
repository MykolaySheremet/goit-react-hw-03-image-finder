import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryBox } from './ImageGallery.styled';


export const ImageGallery = ({ pictureSerch }) => {
            return (
                <>
                    <ImageGalleryBox>
                      {pictureSerch.hits.map(({ id, webformatURL, tags, largeImageURL }) => <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags}></ImageGalleryItem>)}
                    </ImageGalleryBox>
                </>
                
            )
        }