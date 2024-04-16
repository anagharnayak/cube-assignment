import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

interface Customer {
  name: string;
  title: string;
  address: string;
}

interface CustomerDetailsProps {
  customer: Customer | null;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  useEffect(() => {
    // Fetch photos from a public API
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=9');
        const data = response.data;
        const photoUrls = data.map((photo: any) => photo.url);
        setPhotos(photoUrls);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos(); // Call the fetchPhotos function when the component mounts

    const interval = setInterval(() => {
      setPhotoIndex((prevIndex) => (prevIndex + 1) % 9); // Change photo every 10 seconds
    }, 10000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once on mount

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhotoIndex((prevIndex) => (prevIndex + 1) % 9); // Change photo every 10 seconds
    }, 10000);

    return () => clearTimeout(timer);
  }, [photoIndex]); // Update photoIndex triggers the timer to change photo

  if (!customer) return null;

  const summaryText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac leo eget justo consequat scelerisque. Donec quis lacus id felis fermentum aliquet. Maecenas a lacus eu eros cursus imperdiet. Vestibulum aliquam ex in magna hendrerit, vitae fringilla quam varius. Nullam suscipit eros ut tortor malesuada, sed rhoncus ex eleifend. Duis eget leo a eros congue auctor. Quisque rhoncus nisi at ante ullamcorper ultrices. Nullam efficitur nisi id quam fringilla, non vehicula orci feugiat. Sed tempor pretium arcu, eget feugiat justo consequat sit amet. Duis fringilla metus eu risus mattis, nec aliquam est efficitur. Fusce pulvinar ex nec lacus elementum, a fermentum mi ultricies. Integer ac velit ac eros molestie rhoncus. Cras pulvinar ligula vel risus eleifend, vel aliquam felis vehicula.`;

  return (
    <div className="customer-details">
      <h2 style={{ textAlign: 'center' }}>{customer.name}</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
      <div className="summary">{summaryText}</div>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className={`photo ${index === photoIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
