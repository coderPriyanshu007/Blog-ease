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

// export const bookEvent = async (id, userId) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/book/${id}`, { userId });
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to book event");
//   }
// }

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

export const bookEventSeats = async (id, seats,token) => {
  try {
    const res = await axios.post(`${BASE_URL}/book-seats/${id}`, { seats },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to book seats");
  } 
}

export const getAttendees = async (eventId,token) => { 
    try{
      const res = await axios.get(`${BASE_URL}/attendees/${eventId}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;  
    }catch(error){
      throw new Error(error.response?.data?.message)
    }
}

export const removeAttendee = async (attendeeId,token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/attendees/${attendeeId}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to remove attendee");
  } 
};