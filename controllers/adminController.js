const Blog = require("../models/blogs");

const admin_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", { title: "Admin", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const admin_add = (req, res) => {
  // yeni yazi ekleme
  res.render("add", { title: "yeni yazi" });
};

const admin_add_post = (req, res) => {
  // eklenen yeni yaziyi post ile veritabanina gonderiyoruz
  // console.log(req.body); // gelen veriyi body icinde konsola yazdirdik

  const blog = new Blog(req.body);

  blog
    .save() // veritabanina kaydediyoruz
    .then((result) => {
      res.redirect("/admin"); //admin sayfasina yonlendirsin
    })
    .catch((err) => {
      console.log(err);
    });
};

const admin_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id) //databasedeki dosyayi buluyor ve silme islemini gercekelstiriyor
    .then((result) => {
      res.json({ link: "/admin" }); //delete metodu ile gelen istegimize json ile cevap dondurecegiz
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  admin_index,
  admin_add,
  admin_add_post,
  admin_delete,
};
