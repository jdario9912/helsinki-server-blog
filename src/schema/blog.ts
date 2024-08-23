import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

blogSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

const Blog = model("Blog", blogSchema);

export default Blog;
