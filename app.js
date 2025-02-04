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
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
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
