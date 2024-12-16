const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const app = express();

const dbURL =
  "mongodb+srv://tunahan:asd123@nodeblog.p0cvp.mongodb.net/nodeblog?retryWrites=true&w=majority&appName=NodeBlog";
mongoose
  .connect(dbURL)
  .then((result) => app.listen(3001))
  //console.log("baglanti kuruldu"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs"); // html dosyasi icinde jskodlariniyazmak icin ejs paketii kullandik

app.use(express.static("public")); // cssleri statik oalrak yuklemek icin bu kullanilir
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // en son kaydedilen en ustte olur
    .then((result) => {
      res.render("index", { title: "Anasayfa", blogs: result }); //databaseden gelen veriyi kullanmak icin, blogs:result ile databaseden gelen veriyi yazdirdik
    });
  // res.render("index", { title: "Anasayfa" }); // bu title i html dosyasina gondermek icin html dosyasdonda <%%> etieketi icerisinde yazmamiz laazim ve dosyalarin ismini index.html degil de index.ejs yapmamiz lazim
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blog", { blog: result, title: "Detay" });
    })
    .catch((err) => {
      res.status(404).render(404, { title: "Sayfa bulunamadi" });
    });
});

app.get("/admin", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", { title: "Admin", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/admin/add", (req, res) => {
  // yeni yazi ekleme
  res.render("add", { title: "yeni yazi" });
});

app.post("/admin/add", (req, res) => {
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
});

app.delete("/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id) //databasedeki dosyayi buluyor ve silme islemini gercekelstiriyor
    .then((result) => {
      res.json({ link: "/admin" }); //delete metodu ile gelen istegimize json ile cevap dondurecegiz
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Hakkimizda" });
});
app.get("/login", (req, res) => {
  res.render("login", { title: "Giris" });
});

app.use((req, res) => {
  res.status(404).render(404, { title: "Sayfa bulunamadi" });
});

// app.get("/add", (req, res) => {
//   const blog = new Blog({
//     title: "Yeni yazi2",
//     short: "Kisa aciklama",
//     long: "Uzun aciklama",
//   });

//   blog
//     .save() //database e kaydetmek icin
//     .then((result) => {
//       // eger basarili olursa
//       res.send(result);
//     })
//     // basarisiz olursa
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("An error occurred while fetching blogs.");
//     });
// });

// //burda databasedeki tum verilere eristik
// app.get("/all", (req, res) => {
//   Blog.find() //database deki yuklu dosyalara erisir
//     //cevaplri goruntuler
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //tek bir veriye erismek icin de id kullanarak yapariz
// app.get("/single", (req, res) => {
//   Blog.findById("675d7379e004a472b2b0644f")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/", (req, res) => {
//   //  res.send("<h1>Anasayfa</h1>");
//   res.sendFile("./views/index.html", { root: __dirname }); // herhangi bir dosyayi yazdirmak icin
// });

// app.get("/about", (req, res) => {
//   //  res.send("<h1>Anasayfa</h1>");
//   res.sendFile("./views/about.html", { root: __dirname }); // herhangi bir dosyayi yazdirmak icin
// });

// //yonlendirmeler

// app.get("/about-us", (req, res) => {
//   // routerda about-us yazildiginda about sayfasini gosterir
//   res.redirect("/about");
// });

// // bulamadigi isayfalarda 404 sayfasini bizim olsuturdugumuz sayfayi dondurmesi icin boyleyapariz, bunu en altta yazmamiz lazim

// app.use((req, res) => {
//   res.sendFile("./views/404.html", { root: __dirname }); // bu sekildecalisir fakat network ksiminda 200 dondurur, biz 404 dondurmesini ustiyoruz onun icin status(404) u kullanilirz
//   //res.status(404).sendFile("./views/404.html", { root: __dirname });
// });

// app.use((req, res, next) => {
//   console.log(req.method);
//   next();
// }); bunun yerine morgan paketini kullanarak yapabiliriz
