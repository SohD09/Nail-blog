import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import AdminOnlyPrivateRoute from "./components/AdminOnlyPrivateRoute";
import PostPage from "./pages/PostPage";
import UpdatePost from "./pages/UpdatePost";

const CreatePost = lazy(() => import("./pages/CreatePost"));

const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Posts = lazy(() => import("./pages/Posts"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AdminOnlyPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postSlug" element={<PostPage />}></Route>
        </Routes>
        <FooterComponent />
      </Suspense>
    </Router>
  );
};

export default App;
