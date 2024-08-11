import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  console.log(imageFileUploadProgress, imageFileUploadError);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="text-2xl font-semibold text-center my-3">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          alt=""
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative h-32 w-32 rounded-full self-center shadow-md shadow-gray-800 dark:shadow-gray-600"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  textSize: "20px",
                  textColor: "#0968a2",
                },
                path: {
                  stroke: `rgba(5,66,121, ${
                    (imageFileUploadProgress * 10) / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="profile picture"
            className={` rounded-full h-full w-full object-cover cursor-pointer border-8 border-dark-pink dark:border-vodka ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 99 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button
          type="submit"
          className="bg-gradient-to-r from-royal-blue to-dark-pink"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Update
        </Button>
      </form>
      <div className=" flex justify-between mt-5 gap-3">
        <Button
          type="button"
          className="cursor-pointer bg-gradient-to-r from-royal-blue to-dark-pink w-1/2 text-red-300"
          outline
        >
          Delete Account
        </Button>
        <Button
          type="button"
          className="cursor-pointer bg-gradient-to-r from-royal-blue to-dark-pink w-1/2 text-red-300"
          outline
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashProfile;
