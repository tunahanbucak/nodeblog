const Blog = require("../models/blogs");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // en son kaydedilen en ustte olur
    .then((result) => {
      res.render("index", { title: "Anasayfa", blogs: result }); //databaseden gelen veriyi kullanmak icin, blogs:result ile databaseden gelen veriyi yazdirdik
    });
  // res.render("index", { title: "Anasayfa" }); // bu title i html dosyasina gondermek icin html dosyasdonda <%%> etieketi icerisinde yazmamiz laazim ve dosyalarin ismini index.html degil de index.ejs yapmamiz lazim
};

const blog_content = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blog", { blog: result, title: "Detay" });
    })
    .catch((err) => {
      res.status(404).render(404, { title: "Sayfa bulunamadi" });
    });
};

module.exports = {
  blog_index,
  blog_content,
};
