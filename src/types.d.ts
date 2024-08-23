type Blog = {
  type?: "blog";
  id?: string;
  title: string;
  author: string;
  url: string;
  likes: number;
};

type MostBlogs = {
  author: string;
  blogs: number;
};

type MostLikes = {
  author: string;
  likes: number;
};
