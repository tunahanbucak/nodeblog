const express = require("express");
const morgan = require("morgan");

const app = express();
app.listen(3001);

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

app.use(express.static("public")); // cssleri statik oalrak yuklemek icin bu kullanilir
app.use(morgan("tiny"));

app.set("view engine", "ejs"); // html dosyasi icinde jskodlariniyazmak icin ejs paketii kullandik

app.get("/", (req, res) => {
  res.render("index", { title: "Anasayfa" }); // bu title i html dosyasina gondermek icin html dosyasdonda <%%> etieketi icerisinde yazmamiz laazim ve dosyalarin ismini index.html degil de index.ejs yapmamiz lazim
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
