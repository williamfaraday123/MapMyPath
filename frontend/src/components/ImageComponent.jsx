import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

const ImageComponent = ({ place_id }) => {
    const [imageSrc, setImageSrc] = useState('');

    const options = {
        method: 'GET',
        url: 'https://google-maps-extractor2.p.rapidapi.com/business_photos',
        params: {
          business_id: place_id,
          lang: 'en',
          country: 'us',
          limit: '20'
        },
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'google-maps-extractor2.p.rapidapi.com'
        }
    };
      
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.request(options);
                console.log(response.data);
                if (response.data) {
                    setImageSrc(response?.data[0]?.url);
                    console.log(imageSrc);
                }
            } catch (error) {
                alert(error.message);
            }
        };
        if (place_id)
            fetchImage()
    }, [place_id]);

    if (imageSrc)
        return (
            <Image src={imageSrc} fluid rounded />
        );
};

export default ImageComponent;