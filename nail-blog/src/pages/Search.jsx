import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      console.log(urlParams.toString());
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col z-0 bg-[url(\spillbg.jpg)] dark:bg-[url(\spillbgdark.jpg)]">
      <div className="p-7 border-b dark:bg-black dark:bg-opacity-40 dark:border-gray-700 bg-gray-300 bg-opacity-50 border-gray-200">
        <form
          className="flex flex-row flex-wrap md:flex-nowrap justify-left sm:justify-center gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="">All</option>
              <option value="nail-art">Nail Art</option>
              <option value="nail-care">Nail Care</option>
              <option value="product-review">Product review</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToBlue">
            Apply Filters
          </Button>
        </form>
      </div>

      <div className="pt-10 px-5 sm:mx-5 2xl:mx-40 min-h-screen dark:bg-black dark:bg-opacity-40  bg-gray-300 bg-opacity-50">
        {posts && posts.length > 0 ? (
          <div className="flex flex-col sm:items-center gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Search results
            </h2>

            <div className="max-w-[90rem] flex flex-wrap gap-6 justify-center mb-10">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:items-center gap-6">
            <h2 className="text-2xl font-semibold text-center">
              No posts found
            </h2>
          </div>
        )}

        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full text-sky-500 dark:text-sky-300 self-center text-lg sm:text-xl py-10 hover:text-sky-400 dark:hover:text-sky-200"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};
export default Search;
