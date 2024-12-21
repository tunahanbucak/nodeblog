const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoute");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/", (req, res) => {
  res.redirect("/blog");
});

app.use("/", authRoutes);
app.use("/blog", blogRoutes);
app.use("/admin", requireAuth, adminRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "Hakkimizda" });
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
