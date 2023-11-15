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
        <div className="mt-4">
          <img
            className="object-cover h-48 w-96"
            src={URL.createObjectURL(image)}
            alt="preview"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
