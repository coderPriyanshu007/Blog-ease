import Homepage from "./pages/Homepage";
import MainLayout from "./Layouts/MainLayout";
import BlogsPage from "./pages/BlogsPage";
import PageNotFound from "./pages/PageNotFound";
import BlogPage from "./pages/BlogPage";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoutes";

import Dashboard from "./pages/Dashboard";


const App = () => {

 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/blogs" element={<BlogsPage />} />

        {/* logged in user access only */}
        <Route element={<ProtectedRoute /> }>
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
