const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true, // olusturulmasi zorunlu yapiyoruz
    },
    short: {
      type: String,
      require: true,
    },
    long: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
); // timestamps verinin database e ne zmana kaydedildigini tutar

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
