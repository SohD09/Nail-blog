import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostCardFeatured from "../components/PostCardFeatured";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postsFeatured, setPostsFeatured] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?isFeatured=false");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  {
    /* Get featured posts function. Keep in mind in home page I'm reversing the list of featured posts to order them in a pyramid shape on larger screen sizes,
      so this function sorts by oldest first */
  }
  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      const resFeatured = await fetch(
        "/api/post/getPosts?isFeatured=true&sort=asc"
      );
      const dataFeatured = await resFeatured.json();
      setPostsFeatured(dataFeatured.posts);
    };
    fetchFeaturedPosts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-off-white dark:bg-dark-theme-bg">
      <div className="w-full h-80 bg-[url(/banner.jpg)] dark:bg-[url(/banner-dark.jpg)] bg-cover">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-blue dark:text-white lg:text-6xl">
            Welcome to my Blog
          </h1>
          <p className="text-royal-blue dark:text-gray-500 text-xs sm:text-sm">
            Here you'll find a variety of articles and tutorials on different
            nail-art styles.
          </p>
          <Link
            to="/posts"
            className="text-xs sm:text-sm text-dark-pink dark:text-teal-500 font-bold hover:underline"
          >
            View all posts
          </Link>
        </div>
      </div>
      <div className="p-3 bg-orchid dark:bg-slate-700"></div>
      {/* Posts Container */}
      <div className="bg-[url(\homepage.jpg)] dark:bg-[url(\homedark.jpg)] bg-cover">
        <div className="min-h-screen sm:mx-5 2xl:mx-40 px-3 pb-14 pt-24 flex flex-col gap-8 bg-gray-300 dark:bg-slate-900 bg-opacity-60 dark:bg-opacity-50 ">
          {/* Featured Posts */}
          {postsFeatured && postsFeatured.length > 0 && (
            <div className="flex flex-col sm:items-center gap-6 ">
              <h2 className="text-2xl font-semibold text-center text-dark-pink">
                Featured Posts
              </h2>

              <div className="max-w-[90rem] flex flex-wrap-reverse gap-6 justify-center">
                {postsFeatured.map((post) => (
                  <PostCardFeatured key={post._id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Recent Posts */}
          {posts && posts.length < 1 && (
            <div className="my-10 flex justify-center">
              <h1>No Posts to show</h1>
            </div>
          )}
          {posts && posts.length > 0 && (
            <div className="flex flex-col sm:items-center gap-6 my-10">
              <h2 className="text-2xl font-semibold text-center">
                Recent Posts
              </h2>

              <div className="max-w-[90rem] flex flex-wrap gap-6 justify-center">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              <Link
                to={"/posts"}
                className="text-lg text-dark-pink dark:text-light-cobalt-blue hover:underline text-center"
              >
                View all Posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
