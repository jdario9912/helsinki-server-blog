import { Request, Response } from "express";
import BlogModel from "../schema/blog";

const getAllBlogs = async (_: Request, res: Response) => {
  const blogs = await BlogModel.find({});
  return res.json(blogs);
};

const createBlog = async (req: Request, res: Response) => {
  const blog = req.body as Blog;

  if (!blog.author || !blog.title || !blog.url) return res.status(400).end();

  const newBlog = new BlogModel({
    ...blog,
    likes: !blog.likes ? 0 : blog.likes,
  });

  const savedBlog = await newBlog.save();

  return res.status(201).json(savedBlog);
};

const deleteBlog = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await BlogModel.deleteOne({ _id: id });

  if (response.deletedCount === 0) {
    res.statusMessage = `Blog with id ${id} not found`;
    return res.status(404).end();
  }

  return res.status(204).end();
};

const findById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const blogFounded = await BlogModel.findById({ _id: id });

  if (!blogFounded) {
    res.statusMessage = `Blog with id ${id} not found`;
    return res.status(404).end();
  }

  return res.status(200).json(blogFounded);
};

const updateBlog = async (req: Request, res: Response) => {
  const id = req.params.id;

  const newBlog = req.body as Blog;

  const oldBlog = await BlogModel.findOne({ _id: id });

  if (!oldBlog) {
    res.statusMessage = `Blog with id ${id} not found`;

    return res.status(404).end();
  }

  const updated = await BlogModel.findByIdAndUpdate(id, newBlog, {
    new: true,
  });

  // console.log(updated);

  return res.json(updated);
};

export default {
  getAllBlogs,
  createBlog,
  deleteBlog,
  findById,
  updateBlog,
};
