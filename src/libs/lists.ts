export const dummy = (list: Blog[]): 0 | 1 => {
  if (list instanceof Array) return 1;
  else return 0;
};

export const totalLikes = (blogs: Blog[]) =>
  blogs.reduce((sum, curr) => curr.likes + sum, 0);

export const likker = (blogs: Blog[]): Blog => {
  const likes: number[] = blogs.map((blog) => blog.likes);

  const mayor = Math.max(...likes);

  const indexMayor = likes.indexOf(mayor);

  return blogs[indexMayor];
};

export const authorsList = (blogs: Blog[]) => blogs.map((blog) => blog.author);

export const calculateMidAuthors = (authors: string[]): number =>
  authors.length / 2;

export const blogsOfAuthor = (
  currentAuthor: string,
  authors: string[]
): number => authors.filter((author) => author === currentAuthor).length;

export const mostBlogs = (blogs: Blog[]): MostBlogs => {
  let mostBlog: MostBlogs = { author: "", blogs: 0 };

  const authors = authorsList(blogs);

  const midAuthors: number = calculateMidAuthors(authors);

  let currBlogs: number = 0;
  let maxCountBlogs: number = 0;

  for (let i = 0; i < authors.length; i++) {
    const currentAuthor = authors[i];

    currBlogs = blogsOfAuthor(currentAuthor, authors);

    maxCountBlogs = currBlogs > maxCountBlogs ? currBlogs : maxCountBlogs;

    mostBlog = {
      author: blogs.find((blog) => blog.author === currentAuthor)?.author!,
      blogs: maxCountBlogs,
    };

    if (maxCountBlogs >= midAuthors) return mostBlog;
  }

  return mostBlog;
};

export const mostLikes = (blogs: Blog[]): MostLikes => {
  const authors = authorsList(blogs);

  let authorCurrent: MostLikes = { author: "", likes: 0 };
  let mostLikesAuthor: MostLikes = { author: "", likes: 0 };

  authors.forEach((author) => {
    const likesByAuthor = blogs
      .filter((blog) => blog.author === author)
      .reduce((sum, curr) => curr.likes + sum, 0);

    authorCurrent = { author, likes: likesByAuthor };

    mostLikesAuthor =
      authorCurrent.likes > mostLikesAuthor.likes
        ? authorCurrent
        : mostLikesAuthor;
  });

  return mostLikesAuthor;
};
