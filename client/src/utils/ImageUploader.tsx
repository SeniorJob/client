import { useState } from 'react';

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
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
