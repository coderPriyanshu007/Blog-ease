import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/blogs`:"/api/blogs";

export const fetchBlogs = async() => {
  try{
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
  }catch(error){
    throw new Error(error.response?.data?.message) 
  }
}


export const submitBlog = async (blogData,token) => {
  try {
    const res = await axios.post(`${BASE_URL}/create-blog`, blogData,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create blog");
  }

}


export const deleteBlog = async (blog_id,token) =>{
  try{
    const res = await axios.delete(`${BASE_URL}/delete-blog/${blog_id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    )
    return res.data;
  }catch(error){
    throw new Error(error.response?.data?.message || 'failed to delete blog')
  }
}

export const fetchBlogById = async (id,token) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch blog");
  }
}


export const updateBlog = async (blogData,token) => {
  try {
    const res = await axios.patch(`${BASE_URL}/edit-blog/${blogData.blog_id}`, blogData,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }); 
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
}

export const updateBlogViews = async (id)=>{
  try{
    await axios.patch(`${BASE_URL}/update-views/${id}`)
    return res.data;
  }catch(error){
    throw new Error(error.response?.data?.message || "failed to update views"
    )
  }
}
