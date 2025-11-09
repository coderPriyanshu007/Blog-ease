import express from 'express';
import {addBlog, fetchBlogs,fetchBlogById,editBlog, deleteBlog} from '../controllers/blogController.js';
import { authenticate} from '../middlewares/authenticate.js';



const router = express.Router();

router.get('/', fetchBlogs);
router.post('/create-blog',authenticate,addBlog);
router.get('/:id',authenticate,fetchBlogById);
router.patch('/edit-blog/:id',authenticate,editBlog);
router.delete('/delete-blog/:id',authenticate,deleteBlog);


export default router;