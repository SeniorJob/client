import { useState } from 'react';

interface ImageUploaderProps {
  setSelectedImage: (image: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setSelectedImage }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedImage(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && (
        <div>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            style={{ width: '400px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
