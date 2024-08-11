import { Select, TextInput } from "flowbite-react";
import React from "react";

const CreatePost = () => {
  return (
    <div className="min-h-screen  bg-[url('/spillbg.jpg')] bg-cover dark:bg-[url('/spillbgdark.jpg')]">
      <div className="p-3 max-w-3xl mx-auto min-h-screen bg-gray-900 bg-opacity-40 ">
        <h1 className="text-center text-3xl my-7 font-bold dark:text-gray-300  ">
          Create a post
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
            />
            <Select>
              <option value="uncategorized">Select a category</option>
              <option value="nailart">Nail Art</option>
              <option value="nailcare">Nail Care</option>
              <option value="product">Product Review</option>
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
