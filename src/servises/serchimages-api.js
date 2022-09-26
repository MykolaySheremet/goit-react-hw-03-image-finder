const KEY = '29210178-99963cb2fa4a70f711806a762';

function FechCSerchImages(serch) {
    return (fetch(`https://pixabay.com/api/?key=${KEY}&q=${serch}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(
                new Error(`Sorry, but we can't find ${this.props.pictureSerch}. Try more`)
            );
        }))
};


export { FechCSerchImages };