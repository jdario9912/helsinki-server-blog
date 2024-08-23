import {
  authorsList,
  blogsOfAuthor,
  calculateMidAuthors,
  dummy,
  likker,
  mostBlogs,
  mostLikes,
  totalLikes,
} from "../libs/lists";
import { test, describe } from "node:test";
import assert from "node:assert";
import {
  blogComparisonMok,
  initialBlogs,
  listOfAuthorsMok,
  midAuthorsMok,
} from "./moks";

describe("skip test", () => {
  test("dummy return one", () => {
    assert.strictEqual(dummy(initialBlogs), 1);
  });

  test("total likes of blog", () => {
    assert.strictEqual(totalLikes(initialBlogs), 36);
  });

  test("should be the post liker", () => {
    assert.deepStrictEqual(likker(initialBlogs), blogComparisonMok);
  });
});

describe("blogs", () => {
  test("deberia retornar una lista de autores", () => {
    const listAuthors = authorsList(initialBlogs);

    assert.deepEqual(listAuthors, listOfAuthorsMok);
  });

  test("deberia calcular la mitad de los autores", () => {
    const authors = authorsList(initialBlogs);
    const midAuthors = calculateMidAuthors(authors);

    assert.strictEqual(midAuthorsMok, midAuthors);
  });

  describe("deberia retornar el numero de veces que se repite un autor", () => {
    const authors = [
      "Monica Ayos",
      "Michael Chan",
      "Edsger W. Dijkstra",
      "Robert C. Martin",
    ];

    for (let i = 0; i < authors.length; i++) {
      const author = authors[i];
      const total = blogsOfAuthor(author, authorsList(initialBlogs));

      test(`deberia ser ${i}`, () => {
        assert.equal(total, i);
      });
    }
  });

  test("retorna el autor que tiene mas blogs publicados", () => {
    const resultmostBlogs = mostBlogs(initialBlogs);

    assert.deepStrictEqual(resultmostBlogs, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("likes", () => {
  test("deberia retornar el autor con mas likes", () => {
    const resultMostLikes = mostLikes(initialBlogs);

    assert.deepStrictEqual(resultMostLikes, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
