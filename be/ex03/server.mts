import express from "npm:express@4";
import morgan from "npm:morgan";

const STATIC_DIR = "../../ex01";

const app = express();

app.use(express.static(STATIC_DIR));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.post("/suggest.html", (req, res) => {
  console.log(req.body);
  res.redirect("/confirm.html");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
