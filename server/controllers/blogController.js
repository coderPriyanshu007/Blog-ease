

import { fetchAllBlogs ,insertBlog,getBlogById,updateBlog , removeBlog} from '../models/blogModel.js';


export const fetchBlogs = async (req, res) => {
  try {
    const blogs = await fetchAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({message:'error Fetching events',error:err.message})
  }
};


export const addBlog = async (req, res) => {
  const blogData = req.body
  if(!req.user) return res.status(403).json({message:'Unauthorized'});
  try {
    await insertBlog(blogData);
    res.status(201).json({message:'Blog added successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Error adding Blog', error: err });
    console.log(err);
  }
};

export const deleteBlog = async (req,res) => {
  const {id} = req.params;
  if(!req.user) return res.status(403).json({message:'Unauthorized'});

  try{
    await removeBlog(id);
    res.status(200).json({message:'Blog deleted Succesfully'})
  }catch(err){
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
    console.log(err);
  }
}


export const fetchBlogById = async (req, res) => { 
  const { id } = req.params;
  try {
    const blog = await getBlogById(id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'blog not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
};

export const editBlog = async (req, res) => {
  const { id } = req.params;
  const blogData = req.body;
  if(!req.user) return res.status(403).json({message:'Unauthorized'}); 
  try {
    const updatedBlog = await updateBlog(id, blogData);
    if (updatedBlog) {
      res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog }); 
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }

  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
    console.log(err);
  } 
};








