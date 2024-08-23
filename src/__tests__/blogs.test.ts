import { test, beforeEach, after, describe } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app";
import { closeConnMongo } from "../db/mongo";
import Blog from "../schema/blog";
import { blogsInDb, initialBlogs } from "./moks";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogsObject = initialBlogs.map((blog) => new Blog(blog));

  const asyncSavedBlogs = blogsObject.map((blog) => blog.save());

  await Promise.all(asyncSavedBlogs);
});

describe("blogs con docker", () => {
  describe("get", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blog")
        .expect(200)
        .expect("Content-type", /application\/json/);
    });

    test(`deberia tener ${initialBlogs.length} blogs`, async () => {
      const res = await api.get("/api/blog");

      assert.strictEqual(res.body.length, initialBlogs.length);
    });

    test("deberian tener el mismo titulo", async () => {
      const blogsDocker = await Blog.find({});

      const blogToView = blogsDocker[0];

      const blogFounded = await api
        .get(`/api/blog/${blogToView.id}`)
        .expect(200)
        .expect("Content-type", /application\/json/);

      assert.deepStrictEqual(blogFounded.body.title, blogToView.title);
    });
  });

  describe("post", () => {
    test("deberia retornar status 201 y aumentar en uno la cantidad de blogs guardados", async () => {
      await api
        .post("/api/blog")
        .send({
          title: "The Lord of Kind",
          author: "JRR Tolkien",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 354,
        })
        .expect(201)
        .expect("Content-type", /application\/json/);

      const res = await api.get("/api/blog");

      assert.equal(initialBlogs.length, res.body.length - 1);
    });

    test("deberia retornar status 400", async () => {
      await api.post("/api/blog").send({}).expect(400);
    });

    test("deberia retornar likes: 0 si no viene en el body", async () => {
      const res = await api.post("/api/blog").send({
        title: "The Firm",
        author: "John Grisham",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      });

      assert(res.body.likes === 0);
    });
  });

  describe("delete", () => {
    test("deberia eliminar un blog", async () => {
      const blogsBefore = await blogsInDb();

      const blogToDelete = blogsBefore[0];

      await api.delete(`/api/blog/${blogToDelete.id}`).expect(204);

      const blogsAfter = await blogsInDb();

      const titles = blogsAfter.map((blog) => blog.title);

      assert(!titles.includes(blogToDelete.title));
    });

    test("deberia retornar status 400", async () => {
      const anyId = ";laksdjoaieuw93245oiof";
      await api.delete(`/api/blog/${anyId}`).expect(400);
    });

    test("deberia retornar status 404", async () => {
      const anyId = "16480a72f6275d0599982080";

      await api.delete(`/api/blog/${anyId}`).expect(404);
    });
  });

  describe("patch", () => {
    test("deberia actualizar los likes", async () => {
      const blogs = await blogsInDb();

      const blogToUpdate = blogs[0];

      const addLike = 22;

      const res = await api
        .patch(`/api/blog/${blogToUpdate.id}`)
        .send({ ...blogToUpdate, likes: blogToUpdate.likes + addLike })
        .expect(200);

      assert(res.body.likes === blogToUpdate.likes + addLike);
    });
  });

  after(async () => {
    closeConnMongo();
  });
});
