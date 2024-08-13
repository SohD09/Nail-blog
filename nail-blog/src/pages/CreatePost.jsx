import {
  Alert,
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx.min.js";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const [fileURL, setFileURL] = useState(null);
  const [imageURLProgress, setImageURLProgress] = useState(null);
  const [imageURLError, setImageURLError] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    Prism.highlightAll();
  });
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleUploadURL = async () => {
    try {
      if (!fileURL) {
        setImageURLError("Please select an image");
        return;
      }

      setImageURLError(null);
      const storageURL = getStorage(app);
      const fileNameURL = new Date().getTime() + "-" + fileURL.name;
      const storageRefURL = ref(storageURL, fileNameURL);
      const uploadTaskURL = uploadBytesResumable(storageRefURL, fileURL);

      uploadTaskURL.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageURLProgress(progress.toFixed(0));
        },
        (error) => {
          setImageURLError("Image upload failed");
          setImageURLProgress(null);
        },
        () => {
          getDownloadURL(uploadTaskURL.snapshot.ref).then((downloadURL) => {
            setImageURLProgress(null);
            setImageURLError(null);
            setImageURL(downloadURL);
          });
        }
      );
    } catch (error) {
      setImageURLError("Image upload failed");
      setImageURLProgress(null);
      console.log(error);
    }
  };

  const copyURL = () => {
    navigator.clipboard
      .writeText(imageURL)
      .then(() => {
        console.log("successfully copied");
      })
      .catch(() => {
        console.log("something went wrong");
      });
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setFormData({ ...formData, content: editorRef.current.getContent() });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url(\spillbg.jpg)] dark:bg-[url(\spillbgdark.jpg)] bg-contain">
      <div className="p-3 max-w-5xl mx-auto min-h-screen bg-gray-400 dark:bg-gray-900 bg-opacity-35">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a post
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="nail-art">Nail Art</option>
              <option value="nail-care">Nail Care</option>
              <option value="product-review">Product review</option>
            </Select>
            <Select
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.value })
              }
              value={formData.isFeatured}
            >
              <option value="false">Regular</option>
              <option value="true">Featured</option>
            </Select>
          </div>

          {/* 
          Banner Image upload
        */}
          <div className="flex flex-col gap-4 border-4 border-teal-500 border-dotted p-3">
            <Label htmlFor="Banner image upload" value="Select Banner image" />
            <div className="flex items-center justify-between">
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button
                type="button"
                className="bg-gradient-to-r from-dark-pink to-dark-blue hover:text-white"
                size="sm"
                outline
                onClick={handleUploadImage}
                disabled={imageUploadProgress}
              >
                {imageUploadProgress ? (
                  <div className="w-16 h-16 ">
                    <CircularProgressbar
                      value={imageUploadProgress}
                      text={`${imageUploadProgress || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
          </div>

          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}

          {/* 
        Image upload for URL
      */}
          <div className="flex flex-col gap-4 border-1 border-teal-600 border p-3">
            <Label htmlFor="URL image upload" value="Select image to get URL" />
            <div className="flex items-center justify-between">
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => setFileURL(e.target.files[0])}
              />
              <Button
                type="button"
                className="bg-gradient-to-r from-dark-pink to-dark-blue hover:text-white"
                size="sm"
                outline
                onClick={handleUploadURL}
                disabled={imageURLProgress}
              >
                {imageURLProgress ? (
                  <div className="w-16 h-16">
                    <CircularProgressbar
                      value={imageURLProgress}
                      text={`${imageURLProgress || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload for URL"
                )}
              </Button>
            </div>

            {imageURL && (
              <div className="border p-2 flex flex-row">
                {imageURL}
                <Button type="button" onClick={copyURL}>
                  Copy URL
                </Button>
              </div>
            )}
          </div>

          {imageURLError && <Alert color="failure">{imageURLError}</Alert>}

          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Write something...</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "codesample",
                "help",
                "wordcount",
              ],

              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist | " +
                "removeformat | codesample | link image | outdent indent | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            required
          />
          <Button
            className="mt-5"
            type="button"
            gradientDuoTone="skyToBlue"
            outline
            onClick={log}
          >
            Preview
          </Button>
          <Button className="mb-5" type="submit" gradientDuoTone="pinkToOrange">
            {" "}
            Publish{" "}
          </Button>

          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>

        <h1 className="mt-10 mb-7 text-center text-3xl font-semibold">
          Preview:
        </h1>
        <div className="flex flex-col p-10 border dark:border-slate-800 dark:bg-black dark:bg-opacity-20 min-h-80">
          <div
            className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl break-words"
            dangerouslySetInnerHTML={{ __html: formData.title }}
          ></div>

          <Button
            className="self-center my-5"
            color="gray"
            pill
            size="xs"
            onClick=""
          >
            {" "}
            {formData && formData.category}{" "}
          </Button>

          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="mt-10 w-full max-h-[600px] object-fit"
            />
          )}

          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{new Date().toLocaleDateString()}</span>
            <span className="italic">X mins read</span>
          </div>
          <div
            className="mt-10 break-words post-content"
            dangerouslySetInnerHTML={{ __html: formData.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
