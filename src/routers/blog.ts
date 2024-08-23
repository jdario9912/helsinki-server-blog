import { Router } from "express";
import blogs from "../controllers/blog";

const router = Router();

router.get("/", blogs.getAllBlogs);

router.post("/", blogs.createBlog);

router.delete("/:id", blogs.deleteBlog);

router.get("/:id", blogs.findById);

router.patch("/:id", blogs.updateBlog);

export default router;
