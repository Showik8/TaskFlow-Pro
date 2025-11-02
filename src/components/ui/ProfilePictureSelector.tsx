import { useRef, useState } from "react";
import { Upload, User, Trash } from "lucide-react";

interface ProfilePictureSelectorProps {
  image: File | null;
  setImage: (file: File | null) => void;
}

const ProfilePictureSelector: React.FC<ProfilePictureSelectorProps> = ({
  image,
  setImage,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Hidden File Input */}
      <input
        type="file"
        accept=".png, .jpeg, .jpg, image/png, image/jpeg"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* If No Image - Show Placeholder */}
      {!image ? (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200">
            <User className="w-10 h-10 text-gray-500" />
          </div>
          <button
            type="button"
            onClick={onChooseFile}
            className="mt-2 px-4 py-2 flex items-center gap-2 border rounded-md hover:bg-gray-100"
          >
            <Upload className="w-4 h-4" />
            Upload Profile Picture
          </button>
        </div>
      ) : (
        // If Image Exists - Show Preview
        <div className="flex flex-col items-center">
          <img
            src={previewUrl!}
            alt="Profile preview"
            className="w-24 h-24 object-cover rounded-full border"
          />
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={onChooseFile}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Change
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="px-4 py-2 text-sm border rounded-md text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash className="w-4 h-4" /> Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureSelector;
