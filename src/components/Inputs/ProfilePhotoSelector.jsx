/*
 * File         : ProfilePhotoSelector.jsx
 * Author       : Ganapathy
 * Description  : ProfilePhotoSelector component allows users to select and preview a profile photo.
 */

// Import necessary modules
import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// ProfilePhotoSelector component
const ProfilePhotoSelector = ({ image, setImage }) => {
  // useRef to access the file input element
  const inputRef = useRef(null);
  // useState to manage the preview URL of the selected image
  const [previewURL, setPreviewURL] = useState(null);

  // Function to handle image selection
  // It updates the image state and generates a preview URL from the selected file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the image state
      setImage(file);
      // Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  // Function to handle removing the selected image
  // It resets the image and preview URL states and clears the file input
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewURL(null);
    if (inputRef.current) {
      inputRef.current.value = null; // Clear the file input
    }
  };

  // Function to trigger the file input click
  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="profile-photo"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewURL}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

// export the profile photo selector component
export default ProfilePhotoSelector;
