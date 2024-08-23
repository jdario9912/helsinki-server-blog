import BlogModel from "../schema/blog";

export const initialBlogs: Blog[] = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

export const blogComparisonMok = initialBlogs[2];

export const listOfAuthorsMok = [
  "Michael Chan",
  "Edsger W. Dijkstra",
  "Edsger W. Dijkstra",
  "Robert C. Martin",
  "Robert C. Martin",
  "Robert C. Martin",
];

export const midAuthorsMok = initialBlogs.length / 2;

export const blogsInDb = async () => {
  const blogs = await BlogModel.find({});

  return blogs.map((blog) => blog.toJSON()) as Blog[];
};

export const nonExistingId = async () => {
  const blogToSave = new BlogModel({
    author: "Don Pepe",
    likes: 3,
    title: "Titulo groso",
    url: "wasi waso",
  });

  await blogToSave.save();
  await blogToSave.deleteOne();
  return blogToSave.id;
};
